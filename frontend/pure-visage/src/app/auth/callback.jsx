"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';  // For redirecting

export default function AuthCallback() {
    const router = useRouter();

    useEffect(() => {
        // Get the current URL
        const url = new URL(window.location.href);

        // Extract tokens from the URL
        const accessToken = url.hash.match(/access_token=([^&]*)/)?.[1];
        const refreshToken = url.hash.match(/refresh_token=([^&]*)/)?.[1];
        const expiresIn = url.hash.match(/expires_in=([^&]*)/)?.[1];

        // Check if tokens are available
        if (accessToken && refreshToken) {
            // Store tokens in localStorage
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
            localStorage.setItem('expiresIn', expiresIn);

            // Redirect the user to the dashboard
            router.push('/');
        } else {
            console.error('Error: Tokens not found in the URL');
        }
    }, []);

    // While storing tokens and redirecting, show a loading message
    return <div>Loading... Please wait.</div>;
}