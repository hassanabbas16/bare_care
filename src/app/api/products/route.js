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
