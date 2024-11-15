// app/api/tips/route.js
import { supabase } from '../../../lib/supabaseClient';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category") || "general";

    try {
        const { data, error } = await supabase
            .from('skincare_tips')
            .select('*')
            .ilike('category', category)
            .order('created_at', { ascending: true });

        if (error) {
            console.error('Supabase error:', error);
            throw error;
        }

        // Log data for debugging
        console.log(`Data for category "${category}":`, data);

        // Return response with data or an empty array if no data is found
        return new Response(JSON.stringify({ tips: data || [] }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Error fetching tips:', error);
        return new Response(JSON.stringify({ error: error.message, tips: [] }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
