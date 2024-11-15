// app/api/analytics/route.js

import { NextResponse } from 'next/server';
import { supabase } from '../../../../lib/supabaseClient';

export async function GET() {
    try {
        // Count total users from 'profiles' table
        const { count: totalUsers, error: usersError } = await supabase
            .from('profiles')
            .select('*', { count: 'exact', head: true });

        if (usersError) throw usersError;

        // Count total products from 'products' table
        const { count: totalProducts, error: productsError } = await supabase
            .from('products')
            .select('*', { count: 'exact', head: true });

        if (productsError) throw productsError;

        // Count total polls from 'polls' table
        const { count: totalPolls, error: pollsError } = await supabase
            .from('polls')
            .select('*', { count: 'exact', head: true });

        if (pollsError) throw pollsError;

        return NextResponse.json({
            totalUsers,
            totalProducts,
            totalPolls,
        });
    } catch (error) {
        console.error('Error fetching analytics data:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
