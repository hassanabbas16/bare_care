import { supabase } from '../../../lib/supabaseClient';

export async function GET(req) {
    try {
        const { data, error } = await supabase.from('products').select('*');
        if (error) throw error;
        return new Response(JSON.stringify(data), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}

export async function DELETE(req) {
    try {
        const url = new URL(req.url);
        const productId = url.searchParams.get("id");

        if (!productId) {
            return new Response(JSON.stringify({ error: 'Product ID is required' }), { status: 400 });
        }

        const { error } = await supabase.from('products').delete().match({ id: productId });
        if (error) throw error;

        return new Response(null, { status: 204 });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}