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

// PUT - Update an existing blog post
export async function PUT(req, { params }) {
    const { id } = params;
    const user = await getSession(req);
    if (!user) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }

    try {
        const { title, content } = await req.json();

        const { data, error } = await supabase
            .from('blogs')
            .update({ title, content })
            .eq('id', id)
            .eq('user_id', user.id)
            .select('id, title, content, created_at, user_id');

        if (error) throw error;

        if (!data.length) {
            return new Response(JSON.stringify({ error: 'Blog not found or not authorized' }), { status: 404 });
        }

        return new Response(JSON.stringify(data[0]), { status: 200 });
    } catch (error) {
        console.error('Error updating blog:', error);
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}

// DELETE - Delete an existing blog post
export async function DELETE(req, { params }) {
    const { id } = params;
    const user = await getSession(req);
    if (!user) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }

    try {
        const { data, error } = await supabase
            .from('blogs')
            .delete()
            .eq('id', id)
            .eq('user_id', user.id)
            .select('id');

        if (error) throw error;

        if (!data.length) {
            return new Response(JSON.stringify({ error: 'Blog not found or not authorized' }), { status: 404 });
        }

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