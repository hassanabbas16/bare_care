// /app/api/skin-quiz/route.js
import { supabase } from '../../../../lib/supabaseClient';
import { NextResponse } from 'next/server';

// GET - Fetch all skin quiz entries
export async function GET() {
    try {
        const { data, error } = await supabase
            .from('skin_quiz')
            .select(`
                id,
                user_id,
                created_at,
                skin_type,
                sensitivity_level,
                breakout_frequency,
                allergies,
                time_spent,
                product_preferences,
                natural_importance,
                fragrance_free,
                budget_preference,
                age_range,
                concerns
            `)
            .order('created_at', { ascending: false });

        if (error) throw error;

        return NextResponse.json({ skinQuizEntries: data }, { status: 200 });
    } catch (error) {
        console.error('Error fetching skin quiz entries:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
