import { supabase } from '../../../../lib/supabaseClient';

export async function POST(req) {
    const { email, password } = await req.json();

    // Authenticate the user
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 400 });
    }

    if (data.session) {
        // Get the user ID from the session
        const userId = data.user.id;

        // Fetch the user's role from the profiles table
        const { data: profileData, error: profileError } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', userId)
            .single();

        if (profileError || !profileData) {
            return new Response(JSON.stringify({ error: 'Failed to retrieve user role' }), { status: 500 });
        }

        // Include the role in the response
        return new Response(
            JSON.stringify({ message: 'Login successful', role: profileData.role }),
            {
                status: 200,
                headers: {
                    'Set-Cookie': `supabase-session=${data.session.access_token}; HttpOnly; Secure; Path=/; Max-Age=86400`,
                },
            }
        );
    }

    return new Response(JSON.stringify({ error: 'Invalid credentials' }), { status: 400 });
}
