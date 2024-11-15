// src/app/api/polls/[pollId]/vote/route.js

import { supabase } from '@/lib/supabaseClient';

export async function POST(request, { params }) {
    const { pollId } = params;

    try {
        const { optionId } = await request.json();

        if (!optionId) {
            return new Response(JSON.stringify({ error: 'Option ID is required.' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        // Log received parameters for debugging
        console.log('Received pollId:', pollId);
        console.log('Received optionId:', optionId);

        // Call the 'increment_votes' RPC function
        const { data: rpcData, error: rpcError } = await supabase
            .rpc('increment_votes', { option_id: optionId });

        if (rpcError) {
            throw rpcError;
        }

        // Fetch the updated option
        const { data: updatedOption, error: fetchError } = await supabase
            .from('poll_options')
            .select('*')
            .eq('id', optionId)
            .eq('poll_id', pollId)
            .single();

        if (fetchError) {
            throw fetchError;
        }

        // Log the updated option data
        console.log('Updated option data:', updatedOption);

        return new Response(JSON.stringify({ message: 'Vote recorded successfully.', option: updatedOption }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Error recording vote:', error);
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
