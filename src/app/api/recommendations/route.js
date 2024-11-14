import { supabase } from '../../../lib/supabaseClient';

export async function POST(req) {
    try {
        const body = await req.json();
        const user_id = body.user_id;

        if (!user_id) {
            return new Response(JSON.stringify({ error: 'user_id is required' }), { status: 400 });
        }

        // Fetch user's quiz answers from 'skin_quiz' table
        const { data: quizData, error: quizError } = await supabase
            .from('skin_quiz')
            .select('*')
            .eq('user_id', user_id)
            .single();

        if (quizError || !quizData) {
            return new Response(JSON.stringify({ error: 'Failed to fetch quiz data' }), { status: 500 });
        }

        let { skin_type, product_preferences, budget_preference, concerns } = quizData;

        // Map budget preference from quiz to products
        const budgetMapping = {
            'Budget-Friendly': 'low',
            'Mid-Range': 'mid',
            'High-End/Luxury': 'high'
        };
        const budgetPref = budgetMapping[budget_preference];

        // Split product_preferences if it's a string
        let preferences = product_preferences;
        if (typeof preferences === 'string') {
            preferences = preferences.split(',').map(s => s.trim());
        }

        // Ensure product_preferences is an array
        if (!Array.isArray(preferences) || preferences.length === 0) {
            return new Response(JSON.stringify({ error: 'Product preferences are required' }), { status: 400 });
        }

        // Delete existing recommendations for the user
        await supabase
            .from('recommendations')
            .delete()
            .eq('user_id', user_id);

        // Fetch instant recommendations
        let { data: instantProducts, error: instantError } = await supabase
            .from('products')
            .select('id')
            .in('skin_type', [skin_type.toLowerCase(), 'all'])
            .eq('budget_preference', budgetPref)
            .in('category', preferences)
            .limit(5);

        if (instantError) {
            console.error('Error fetching instant recommendations:', instantError);
            return new Response(JSON.stringify({ error: 'Failed to fetch instant recommendations' }), { status: 500 });
        }

        // Handle concerns field
        let concernList = concerns;
        if (typeof concernList === 'string') {
            concernList = concernList.split(',').map(s => s.trim());
        }

        // Fetch 'also suited for you' recommendations based on concerns
        let { data: concernProducts, error: concernError } = await supabase
            .from('products')
            .select('id')
            .or(concernList.map(concern => `concern.ilike.%${concern}%`).join(','))
            .limit(5);

        if (concernError) {
            console.error('Error fetching concern-based recommendations:', concernError);
            return new Response(JSON.stringify({ error: 'Failed to fetch concern-based recommendations' }), { status: 500 });
        }

        // Combine product IDs and remove duplicates
        const allProductIds = new Set();
        const instantProductIds = instantProducts.map(p => p.id);
        const concernProductIds = concernProducts.map(p => p.id);

        instantProductIds.forEach(id => allProductIds.add(id));
        concernProductIds.forEach(id => allProductIds.add(id));

        const productIds = Array.from(allProductIds);

        // Prepare recommendations to insert into 'recommendations' table
        const recommendationsToInsert = [];

        for (const id of instantProductIds) {
            recommendationsToInsert.push({
                user_id: user_id,
                product_id: id,
                recommendation_type: 'instant'
            });
        }

        for (const id of concernProductIds) {
            // Avoid duplicate entries
            if (!instantProductIds.includes(id)) {
                recommendationsToInsert.push({
                    user_id: user_id,
                    product_id: id,
                    recommendation_type: 'also_suited'
                });
            }
        }

        // Insert recommendations into the database
        const { error: insertError } = await supabase
            .from('recommendations')
            .insert(recommendationsToInsert);

        if (insertError) {
            console.error('Error inserting recommendations:', insertError);
            return new Response(JSON.stringify({ error: 'Failed to store recommendations' }), { status: 500 });
        }

        // Return the product IDs
        return new Response(JSON.stringify({ product_ids: productIds }), { status: 200 });

    } catch (error) {
        console.error('Unexpected error:', error);
        return new Response(JSON.stringify({ error: 'An unexpected error occurred' }), { status: 500 });
    }
}
