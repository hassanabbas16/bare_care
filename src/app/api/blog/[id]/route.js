// app/api/blog/[id]/route.js
import { supabase } from '../../../../lib/supabaseClient';
import { getSession } from '../../../../lib/getSession';

// GET - Fetch a specific blog by ID
export async function GET(req, { params }) {
    const { id } = params;
    try {
        const { data, error } = await supabase
            .from('blogs')
            .select(`
                *,
                profiles (
                    first_name,
                    last_name
                )
            `)
            .eq('id', id)
            .single();
        if (error) throw error;

        // Corrected variable from 'blog' to 'data'
        const blogWithAuthorName = {
            ...data,
            author_name: data.profiles
                ? `${data.profiles.first_name} ${data.profiles.last_name}`
                : 'Anonymous',
        };

        return new Response(JSON.stringify(blogWithAuthorName), { status: 200 });
    } catch (error) {
        console.error('Error fetching blog:', error);
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}
