import { supabase } from '../../../../lib/supabaseClient';

export async function POST(req) {
    try {
        const body = await req.json();
        const { ids } = body;

        if (!Array.isArray(ids) || ids.length === 0) {
            return new Response(JSON.stringify({ error: 'No product IDs provided' }), { status: 400 });
        }

        const { data: products, error } = await supabase
            .from('products')
            .select('*')
            .in('id', ids);

        if (error) {
            console.error('Error fetching products by IDs:', error);
            return new Response(JSON.stringify({ error: 'Failed to fetch products' }), { status: 500 });
        }

        return new Response(JSON.stringify({ products }), { status: 200 });

    } catch (error) {
        console.error('Unexpected error:', error);
        return new Response(JSON.stringify({ error: 'An unexpected error occurred' }), { status: 500 });
    }
}
