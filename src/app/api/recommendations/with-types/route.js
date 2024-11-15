import { supabase } from '../../../../lib/supabaseClient';

export async function POST(req) {
    try {
        const body = await req.json();
        const { user_id } = body;

        if (!user_id) {
            return new Response(JSON.stringify({ error: 'user_id is required' }), { status: 400 });
        }

        // Fetch recommendations with recommendation_type
        const { data: recommendations, error } = await supabase
            .from('recommendations')
            .select('product_id, recommendation_type')
            .eq('user_id', user_id);

        if (error) {
            console.error('Error fetching recommendations:', error);
            return new Response(JSON.stringify({ error: 'Failed to fetch recommendations' }), { status: 500 });
        }

        return new Response(JSON.stringify({ recommendations }), { status: 200 });
    } catch (error) {
        console.error('Unexpected error:', error);
        return new Response(JSON.stringify({ error: 'An unexpected error occurred' }), { status: 500 });
    }
}
