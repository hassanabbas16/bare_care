import { supabase } from '../../../lib/supabaseClient';

export async function POST(req) {
    try {
        const body = await req.json();
        const {
            user_id,
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
            allergyDetails
        } = body;

        // Validate budget_preference against allowed values
        const validBudgetPreferences = ['Budget-Friendly', 'Mid-Range', 'High-End/Luxury'];
        const budgetPref = validBudgetPreferences.includes(budget_preference) ? budget_preference : 'Budget-Friendly'; // Default value if invalid

        const { data, error } = await supabase
            .from('skin_quiz')
            .insert([
                {
                    user_id,
                    skin_type,
                    sensitivity_level,
                    breakout_frequency,
                    allergies: allergyDetails || allergies,
                    time_spent,
                    product_preferences: product_preferences.join(', '),
                    natural_importance,
                    fragrance_free,
                    budget_preference: budgetPref,
                    age_range
                }
            ]);

        if (error) {
            console.error("Error inserting data:", error);
            return new Response(JSON.stringify({ error: "Error saving quiz data" }), { status: 500 });
        }

        return new Response(JSON.stringify({ message: "Quiz data saved successfully", data }), { status: 200 });
    } catch (error) {
        console.error("Error processing request:", error);
        return new Response(JSON.stringify({ error: "Error processing request" }), { status: 500 });
    }
}

export async function GET(req) {
    try {
        const url = new URL(req.url);
        const user_id = url.searchParams.get('user_id');

        if (!user_id) {
            return new Response(JSON.stringify({ error: "User ID is required" }), { status: 400 });
        }

        // Fetch the quiz data for the specific user
        const { data, error } = await supabase
            .from('skin_quiz')
            .select('*')
            .eq('user_id', user_id)
            .single();

        if (error) {
            console.error("Error fetching quiz data:", error);
            return new Response(JSON.stringify({ error: "Error fetching quiz data" }), { status: 500 });
        }

        return new Response(JSON.stringify(data), { status: 200 });
    } catch (error) {
        console.error("Error processing request:", error);
        return new Response(JSON.stringify({ error: "Error processing request" }), { status: 500 });
    }
}

export async function PUT(req) {
    try {
        const body = await req.json();
        const {
            user_id,
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
            allergyDetails
        } = body;

        // Ensure product_preferences is an array before joining it into a string
        const formattedPreferences = Array.isArray(product_preferences)
            ? product_preferences.join(', ')
            : product_preferences;

        const updatedData = {
            skin_type,
            sensitivity_level,
            breakout_frequency,
            allergies: allergyDetails || allergies,
            time_spent,
            product_preferences: formattedPreferences,
            natural_importance,
            fragrance_free,
            budget_preference,
            age_range
        };

        // Perform update query
        const { data, error } = await supabase
            .from('skin_quiz')
            .update(updatedData)
            .eq('user_id', user_id);

        if (error) {
            console.error("Error updating quiz data:", error);
            return new Response(JSON.stringify({ error: "Error updating quiz data" }), { status: 500 });
        }

        return new Response(JSON.stringify({ message: "Quiz data updated successfully", data }), { status: 200 });
    } catch (error) {
        console.error("Error processing request:", error);
        return new Response(JSON.stringify({ error: "Error processing request" }), { status: 500 });
    }
}
