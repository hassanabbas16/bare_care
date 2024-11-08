// app/api/blog/[id]/liked/route.js
import { supabase } from '../../../../../lib/supabaseClient';
import { getSession } from '../../../../../lib/getSession';

// GET - Check if the logged-in user has liked the blog
export async function GET(req, { params }) {
    const { id } = params;
    const user = await getSession(req);
    if (!user) {
        return new Response(JSON.stringify({ liked: false }), { status: 200 });
    }
    try {
        const { data, error } = await supabase
            .from('blog_likes')
            .select('id')
            .eq('user_id', user.id)
            .eq('blog_id', id)
            .single();
        if (error && error.code !== 'PGRST116' && error.code !== '404') throw error; // Ignore No Rows error
        const liked = !!data;
        return new Response(JSON.stringify({ liked }), { status: 200 });
    } catch (error) {
        console.error('Error checking liked status:', error);
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}
