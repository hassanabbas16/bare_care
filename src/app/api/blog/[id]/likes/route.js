// app/api/blog/[id]/likes/route.js
import { supabase } from '../../../../../lib/supabaseClient';
import { getSession } from '../../../../../lib/getSession';

// POST - Toggle like for a specific blog by ID
export async function POST(req, { params }) {
    const { id } = params;
    const { action } = await req.json();
    const user = await getSession(req); // Can be null for anonymous users

    if (!action || !['like', 'unlike'].includes(action)) {
        return new Response(JSON.stringify({ error: 'Invalid action' }), { status: 400 });
    }

    try {
        // Retrieve existing likes
        const { data: blogData, error: blogError } = await supabase
            .from('blogs')
            .select('likes')
            .eq('id', id)
            .single();

        if (blogError) throw blogError;

        let newLikes = blogData.likes || 0;

        if (action === 'like') {
            newLikes += 1;
        } else if (action === 'unlike' && newLikes > 0) {
            newLikes -= 1;
        }

        // Update the likes count in the blogs table
        const { error: updateError } = await supabase
            .from('blogs')
            .update({ likes: newLikes })
            .eq('id', id);

        if (updateError) throw updateError;

        // For logged-in users, record the like/unlike action
        if (user) {
            if (action === 'like') {
                // Insert a record into blog_likes table
                const { error: insertError } = await supabase
                    .from('blog_likes')
                    .insert([{ user_id: user.id, blog_id: id }]);
                if (insertError && insertError.code !== '23505') { // Ignore duplicate key error
                    throw insertError;
                }
            } else if (action === 'unlike') {
                // Delete the record from blog_likes table
                const { error: deleteError } = await supabase
                    .from('blog_likes')
                    .delete()
                    .eq('user_id', user.id)
                    .eq('blog_id', id);
                if (deleteError) throw deleteError;
            }
        }

        return new Response(JSON.stringify({ likes: newLikes }), { status: 200 });
    } catch (error) {
        console.error('Error toggling like:', error);
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}

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
        if (error && error.code !== 'PGRST116') throw error; // Ignore No Rows error
        const liked = !!data;
        return new Response(JSON.stringify({ liked }), { status: 200 });
    } catch (error) {
        console.error('Error checking liked status:', error);
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}
