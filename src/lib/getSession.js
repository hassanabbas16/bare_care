// lib/getSession.js
import { supabase } from './supabaseClient';

export async function getSession(req) {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) return null;

    const token = authHeader.replace('Bearer ', '');
    if (!token) return null;

    const { data: { user }, error } = await supabase.auth.getUser(token);
    if (error) {
        console.error('Error fetching user session:', error);
        return null;
    }
    return user;
}
