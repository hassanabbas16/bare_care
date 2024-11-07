// app/api/blog/[id]/comment.js
import { supabase } from '../../../../lib/supabaseClient';
import { getSession } from '../../../../lib/getSession';

// GET - Fetch comments for a specific blog
export async function GET(req, { params }) {
    const { id } = params;
    try {
        const { data, error } = await supabase
            .from('comments')
            .select('*, users!left(display_name)')
            .eq('blog_id', id)
            .order('created_at', { ascending: false });
        if (error) throw error;

        const commentsWithUsername = data.map((comment) => ({
            ...comment,
            username: comment.users ? comment.users.display_name : 'Anonymous',
        }));

        return new Response(JSON.stringify(commentsWithUsername), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}

// POST - Add a new comment to a specific blog
export async function POST(req, { params }) {
    const { id } = params;
    const user = await getSession(req); // Can be null for anonymous comments
    try {
        const { content } = await req.json();
        const newComment = {
            blog_id: id,
            content,
            user_id: user ? user.id : null,
        };
        const { data, error } = await supabase
            .from('comments')
            .insert([newComment])
            .select('*, users(display_name)');
        if (error) throw error;

        const commentWithUsername = {
            ...data[0],
            username: data[0].users ? data[0].users.display_name : 'Anonymous',
        };

        return new Response(JSON.stringify(commentWithUsername), { status: 201 });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}
