"use client";
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';  // Adjust the path if needed
import { useRouter } from 'next/router';
import { Typography, Button } from '@mui/material';

export default function Dashboard() {
    const [user, setUser] = useState(null);
    const [protectedData, setProtectedData] = useState(null);
    const router = useRouter();

    // Fetch JWT token and verify user session
    useEffect(() => {
        const session = supabase.auth.session();
        if (!session) {
            router.push('/login');  // Redirect to login if not authenticated
        } else {
            setUser(session.user);  // Set user data for display
        }
    }, []);

    // Function to fetch protected data from the backend
    const fetchProtectedData = async () => {
        const token = supabase.auth.session()?.access_token;  // Get JWT token from Supabase

        try {
            const response = await fetch('http://localhost:5000/api/protected', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,  // Include JWT token in headers
                },
            });

            const data = await response.json();
            setProtectedData(data);  // Store the protected data in state
        } catch (error) {
            console.error('Error fetching protected data:', error);
        }
    };

    if (!user) return null; // Wait until user data is fetched

    return (
        <div>
            <Typography variant="h4" component="h1">
                Welcome to the Dashboard, {user.email}!
            </Typography>

            <Button variant="contained" color="primary" onClick={fetchProtectedData}>
                Get Protected Data
            </Button>

            {protectedData && (
                <Typography variant="body1" component="p">
                    {JSON.stringify(protectedData)}
                </Typography>
            )}
        </div>
    );
}