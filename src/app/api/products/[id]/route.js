// /pages/api/products/[id].js
import { supabase } from "../../../../lib/supabaseClient";
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
    const { id } = params;

    const { data: product, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(product);
}
