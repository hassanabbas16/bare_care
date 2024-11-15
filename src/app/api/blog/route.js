// app/api/blog/route.js
import { supabase } from '../../../lib/supabaseClient';
import { getSession } from '../../../lib/getSession';

// GET - Fetch all blogs
export async function GET(req) {
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
            .order('created_at', { ascending: false });

        if (error) throw error;

        // Map the blogs to include author_name
        const blogsWithAuthorName = data.map((blog) => ({
            ...blog,
            author_name: blog.profiles ? `${blog.profiles.first_name} ${blog.profiles.last_name}` : 'Anonymous',
        }));

        return new Response(JSON.stringify(blogsWithAuthorName), { status: 200 });
    } catch (error) {
        console.error('Error fetching blogs:', error);
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}

// POST - Create a new blog
export async function POST(req) {
    const user = await getSession(req);
    if (!user) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }
    try {
        const { title, content, image_url } = await req.json();
        const { data, error } = await supabase
            .from('blogs')
            .insert([{ title, content, user_id: user.id }])
            .select('id, title, content, created_at, user_id');
        if (error) throw error;
        return new Response(JSON.stringify(data[0]), { status: 201 });
    } catch (error) {
        console.error('Error creating blog:', error);
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}

// OPTIONS - Handle preflight requests
export function OPTIONS() {
    return new Response(null, {
        status: 204,
        headers: {
            Allow: 'GET, POST, OPTIONS',
        },
    });
}
