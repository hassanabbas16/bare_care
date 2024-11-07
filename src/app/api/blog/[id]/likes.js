// app/api/blog/[id]/like.js
import { supabase } from '../../../../lib/supabaseClient';

// POST - Like a specific blog by ID
export async function POST(req, { params }) {
    const { id } = params;
    try {
        const { data, error } = await supabase
            .rpc('increment_likes', { blog_id: id });
        if (error) throw error;
        return new Response(JSON.stringify({ message: 'Blog liked successfully' }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}
