// /app/api/wishlist/route.js
import { supabase } from '../../../lib/supabaseClient';
import { NextResponse } from 'next/server';

export async function GET(request) {
    // Extract session token from cookies
    const cookie = request.headers.get('cookie') || '';
    const sessionToken = cookie
        .split('; ')
        .find((c) => c.startsWith('supabase-session='))
        ?.split('=')[1];

    if (!sessionToken) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get the user using the session token
    const { data: { user }, error: userError } = await supabase.auth.getUser(sessionToken);

    if (userError || !user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user_id = user.id;

    // Fetch the wishlist items along with product details
    const { data: wishlistItems, error } = await supabase
        .from('wishlist')
        .select('product_id, products(*)')
        .eq('user_id', user_id);

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ wishlistItems }, { status: 200 });
}

export async function GET_ANALYTICS(request) {
    try {
        const { data: wishlistAnalytics, error } = await supabase
            .from('wishlist')
            .select('product_id, products(*), count(*)')
            .group('product_id')
            .order('count', { ascending: false });

        if (error) throw error;

        return NextResponse.json({ wishlistAnalytics }, { status: 200 });
    } catch (error) {
        console.error('Error fetching wishlist analytics:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}