import { supabase } from '../../../../lib/supabaseClient';

export async function GET(req) {
    console.log("Session API called");

    const cookie = req.headers.get('cookie') || '';
    const sessionToken = cookie
        .split('; ')
        .find((c) => c.startsWith('supabase-session='))
        ?.split('=')[1];

    if (!sessionToken) {
        console.log("No session token found");
        return new Response(JSON.stringify({ loggedIn: false }), { status: 200 });
    }

    const { data, error } = await supabase.auth.getUser(sessionToken);

    if (error || !data.user) {
        console.log("Invalid session or error:", error);
        return new Response(JSON.stringify({ loggedIn: false }), { status: 200 });
    }

    console.log("User authenticated:", data.user);
    return new Response(JSON.stringify({ loggedIn: true, user: data.user }), { status: 200 });
}
