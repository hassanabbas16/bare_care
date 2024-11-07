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

        const blogWithAuthorName = {
            ...data,
            author_name: blog.profiles ? `${blog.profiles.first_name} ${blog.profiles.last_name}` : 'Anonymous',
        };

        return new Response(JSON.stringify(blogWithAuthorName), { status: 200 });
    } catch (error) {
        console.error('Error fetching blog:', error);
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}

// PUT - Update a specific blog by ID
export async function PUT(req, { params }) {
    const { id } = params;
    const user = await getSession(req);
    if (!user) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }
    try {
        // Check if the user is the owner of the blog
        const { data: blog, error: fetchError } = await supabase
            .from('blogs')
            .select('user_id')
            .eq('id', id)
            .single();
        if (fetchError) throw fetchError;
        if (blog.user_id !== user.id) {
            return new Response(JSON.stringify({ error: 'Forbidden' }), { status: 403 });
        }
        const { title, content, image_url } = await req.json();
        const { data, error } = await supabase
            .from('blogs')
            .update({ title, content, image_url })
            .eq('id', id)
            .select();
        if (error) throw error;
        return new Response(JSON.stringify(data[0]), { status: 200 });
    } catch (error) {
        console.error('Error updating blog:', error);
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}

// DELETE - Delete a specific blog by ID
export async function DELETE(req, { params }) {
    const { id } = params;
    const user = await getSession(req);
    if (!user) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }
    try {
        // Check if the user is the owner of the blog
        const { data: blog, error: fetchError } = await supabase
            .from('blogs')
            .select('user_id')
            .eq('id', id)
            .single();
        if (fetchError) throw fetchError;
        if (blog.user_id !== user.id) {
            return new Response(JSON.stringify({ error: 'Forbidden' }), { status: 403 });
        }
        const { error } = await supabase.from('blogs').delete().eq('id', id);
        if (error) throw error;
        return new Response(JSON.stringify({ message: 'Blog deleted successfully' }), { status: 200 });
    } catch (error) {
        console.error('Error deleting blog:', error);
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}

// OPTIONS - Handle preflight requests
export function OPTIONS() {
    return new Response(null, {
        status: 204,
        headers: {
            Allow: 'GET, PUT, DELETE, OPTIONS',
        },
    });
}
