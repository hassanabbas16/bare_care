export async function POST() {
    return new Response(JSON.stringify({ message: 'Logged out' }), {
        status: 200,
        headers: {
            'Set-Cookie': 'supabase-session=; HttpOnly; Secure; Path=/; Max-Age=0',
        },
    });
}
