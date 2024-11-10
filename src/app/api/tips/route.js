// app/api/tips/random/route.js
import { supabase } from '../../../lib/supabaseClient';
import { NextResponse } from 'next/server';

export async function GET() {
    const { data, error } = await supabase
        .from('skincare_tips')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(3); // Fetch 3 random tips (adjust to shuffle if needed)

    if (error) {
        return NextResponse.json({ error: 'Failed to fetch tips' }, { status: 500 });
    }

    return NextResponse.json(data, { status: 200 });
}
