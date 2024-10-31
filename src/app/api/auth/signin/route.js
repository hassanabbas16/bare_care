import { supabase } from '../../../../lib/supabaseClient';

export async function POST(req) {
    const { email, password } = await req.json();

    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 400 });
    }

    if (data.session) {
        console.log(data.session);
        return new Response(JSON.stringify({ message: 'Login successful' }), {
            status: 200,
            headers: {
                'Set-Cookie': `supabase-session=${data.session.access_token}; HttpOnly; Secure; Path=/; Max-Age=86400`,
            },
        });
    }

    return new Response(JSON.stringify({ error: 'Invalid credentials' }), { status: 400 });
}
