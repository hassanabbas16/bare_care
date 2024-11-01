// app/api/reviews/route.js
import { NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabaseClient';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const product_id = searchParams.get('product_id');

    if (!product_id) {
        return NextResponse.json({ error: 'Product ID is required' }, { status: 400 });
    }

    const { data: reviews, error } = await supabase
        .from('reviews')
        .select('*, users(username)')
        .eq('product_id', product_id)
        .order('created_at', { ascending: false });

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(reviews, { status: 200 });
}

export async function POST(request) {
    const { comment, rating, product_id } = await request.json();

    // Check user session
    const { data: session, error: sessionError } = await supabase.auth.getSession();

    if (sessionError || !session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user_id = session.user.id;

    // Insert the review
    const { data, error } = await supabase
        .from('reviews')
        .insert([{ user_id, product_id, rating, comment }]);

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data[0], { status: 201 });
}
