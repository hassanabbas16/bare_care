import { supabase } from '../../../../lib/supabaseClient';

export async function POST(req) {
    const { email, password, firstName, lastName, age, gender } = await req.json();

    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                first_name: firstName,
                last_name: lastName,
                display_name: `${firstName} ${lastName}`,
            },
        },
    });

    if (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 400 });
    }

    if (data.user) {
        const { error: profileError } = await supabase
            .from('profiles')
            .insert([{
                id: data.user.id,
                first_name: firstName,
                last_name: lastName,
                age,
                gender,
            }]);

        if (profileError) {
            return new Response(JSON.stringify({ error: profileError.message }), { status: 500 });
        }

        return new Response(JSON.stringify({ message: 'Signup successful!' }), { status: 200 });
    }
}
