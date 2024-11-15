import { supabase } from '../../../../lib/supabaseClient';

// GET - Fetch all polls with their options
export async function GET() {
    try {
        const { data: polls, error } = await supabase
            .from('polls')
            .select(`
                *,
                poll_options (*)
            `)
            .order('created_at', { ascending: false });

        if (error) throw error;

        return new Response(JSON.stringify(polls), { status: 200 });
    } catch (error) {
        console.error('Error fetching polls:', error);
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}

// POST - Add a new poll with options
export async function POST(req) {
    try {
        const { question, display_date, options } = await req.json();

        // Insert the poll
        const { data: poll, error: pollError } = await supabase
            .from('polls')
            .insert([{ question, display_date }])
            .select()
            .single();

        if (pollError) throw pollError;

        // Insert the poll options
        const pollOptions = options.map((option) => ({
            poll_id: poll.id,
            option_text: option,
            votes: 0,
        }));

        const { error: optionsError } = await supabase.from('poll_options').insert(pollOptions);

        if (optionsError) throw optionsError;

        // Fetch the created poll with its options
        const { data: createdPoll, error: fetchError } = await supabase
            .from('polls')
            .select(`
                *,
                poll_options (*)
            `)
            .eq('id', poll.id)
            .single();

        if (fetchError) throw fetchError;

        return new Response(JSON.stringify(createdPoll), { status: 201 });
    } catch (error) {
        console.error('Error creating poll:', error);
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}