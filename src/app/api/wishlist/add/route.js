// /app/api/wishlist/add/route.js
import { supabase } from '../../../../lib/supabaseClient';
import { NextResponse } from 'next/server';

export async function POST(request) {
    const { product_id } = await request.json();

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

    const { error: insertError } = await supabase
        .from('wishlist')
        .insert([{ user_id, product_id }]);

    if (insertError) {
        return NextResponse.json({ error: insertError.message }, { status: 500 });
    }

    return NextResponse.json({ message: 'Product added to wishlist' }, { status: 200 });
}
