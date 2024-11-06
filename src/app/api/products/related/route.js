// /pages/api/products/related.js
import { supabase } from "../../../../lib/supabaseClient";
import { NextResponse } from 'next/server';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const product_id = parseInt(searchParams.get('product_id'), 10);

    // Fetch the current product to get its category
    const { data: currentProduct, error: currentProductError } = await supabase
        .from('products')
        .select('category')
        .eq('id', product_id)
        .single();

    if (currentProductError) {
        return NextResponse.json({ error: currentProductError.message }, { status: 500 });
    }

    // Call the function to get random products
    const { data: relatedProducts, error } = await supabase.rpc('get_random_products', {
        p_category: currentProduct.category,
        p_exclude_id: product_id,
        p_limit: 5,
    });

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(relatedProducts);
}
