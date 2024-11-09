// app/api/products/normalized-name/[name]/route.js
import { supabase } from '../../../../../lib/supabaseClient';

export async function GET(req, { params }) {
    const { name } = params;

    try {
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .eq('normalized_name', name);

        if (error) {
            console.error('Error fetching products by normalized_name:', error);
            return new Response(JSON.stringify({ error: error.message }), { status: 500 });
        }

        return new Response(JSON.stringify(data), { status: 200 });
    } catch (error) {
        console.error('Unexpected error:', error);
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}
