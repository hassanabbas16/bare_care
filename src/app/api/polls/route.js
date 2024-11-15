// app/api/polls/route.js
import { supabase } from '../../../lib/supabaseClient';

export async function GET(request) {
    try {
        // Fetch today's poll
        const today = new Date().toISOString().split('T')[0];

        const { data: poll, error: pollError } = await supabase
            .from('polls')
            .select('*')
            .eq('display_date', today)
            .single();

        if (pollError) {
            throw pollError;
        }

        // Fetch poll options
        const { data: options, error: optionsError } = await supabase
            .from('poll_options')
            .select('*')
            .eq('poll_id', poll.id);

        if (optionsError) {
            throw optionsError;
        }

        return new Response(JSON.stringify({ poll, options }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Error fetching poll:', error);
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
