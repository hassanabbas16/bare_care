// /app/api/reviews/route.js
import { supabase } from '../../../lib/supabaseClient';
import { NextResponse } from 'next/server';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const product_id = searchParams.get('product_id');

    if (!product_id) {
        return NextResponse.json({ error: 'Product ID is required' }, { status: 400 });
    }

    try {
        const { data: reviews, error } = await supabase
            .from('reviews')
            .select('*, profiles(first_name, last_name)')
            .eq('product_id', product_id);

        if (error) {
            console.error('Error fetching reviews:', error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json(reviews, { status: 200 });
    } catch (error) {
        console.error('Unexpected error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST(request) {
    const { comment, rating, product_id } = await request.json();

    // Extract session token from cookies
    const cookie = request.headers.get('cookie') || '';
    const sessionToken = cookie
        .split('; ')
        .find((c) => c.startsWith('supabase-session='))
        ?.split('=')[1];

    if (!sessionToken) {
        console.log("No session token found");
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get the user using the session token
    const { data: userData, error: userError } = await supabase.auth.getUser(sessionToken);

    if (userError || !userData.user) {
        console.log("Invalid session or error:", userError);
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user_id = userData.user.id;

    // Insert the review into the database
    const { data, error: insertError } = await supabase
        .from('reviews')
        .insert([{ user_id, product_id, rating, comment }])
        .select();

    if (insertError) {
        console.error("Error inserting review:", insertError);
        return NextResponse.json({ error: insertError.message }, { status: 500 });
    }

    return NextResponse.json(data[0], { status: 201 });
}
