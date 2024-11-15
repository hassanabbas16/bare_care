// app/api/users/route.js
import { supabase } from '../../../lib/supabaseClient';
import { getSession } from '../../../lib/getSession';

// GET - Fetch all users from profiles table
export async function GET(req) {
    try {
        const { data, error } = await supabase.from('profiles').select('*');
        if (error) throw error;
        return new Response(JSON.stringify(data), { status: 200 });
    } catch (error) {
        console.error('Error fetching users:', error);
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}

// PUT - Update user role
export async function PUT(req) {
    const { id, role } = await req.json();

    try {
        const { error } = await supabase
            .from('profiles')
            .update({ role })
            .match({ id });

        if (error) throw error;

        return new Response(JSON.stringify({ message: 'Role updated successfully' }), { status: 200 });
    } catch (error) {
        console.error('Error updating role:', error);
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}

// DELETE - Delete a user by ID (from both Supabase Auth and profiles table)
export async function DELETE(req) {
    const url = new URL(req.url);
    const userId = url.searchParams.get('id'); // Extract user ID from query parameters

    if (!userId) {
        return new Response(JSON.stringify({ error: 'User ID is required' }), { status: 400 });
    }

    try {
        // Delete user from Supabase Auth
        const { error: authError } = await supabase.auth.admin.deleteUser(userId);
        if (authError) throw authError;

        // Delete user from profiles table
        const { error: profileError } = await supabase
            .from('profiles')
            .delete()
            .match({ id: userId });

        if (profileError) throw profileError;

        return new Response(null, { status: 204 });
    } catch (error) {
        console.error('Error deleting user:', error);
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}
