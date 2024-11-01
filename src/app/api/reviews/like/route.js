// app/api/reviews/like/route.js
import { NextResponse } from 'next/server';
import { supabase } from '../../../../lib/supabaseClient';

export async function POST(request) {
    const { review_id } = await request.json();

    if (!review_id) {
        return NextResponse.json({ error: 'Review ID is required' }, { status: 400 });
    }

    const { error } = await supabase.rpc('increment_likes', { review_id_param: review_id });

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: 'Like added' }, { status: 200 });
}
