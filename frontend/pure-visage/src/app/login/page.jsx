"use client";  // This ensures the component is client-side

import { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { Box, Button, TextField, Typography, Alert } from '@mui/material';

// Bright Mode Theme Colors
const brightMode = {
    background: "rgba(255, 193, 188, 0.3)",  // Light peach with glassmorphism
    text: "#FC1CCC",  // Bart pink
    button: "#F5BFB9",  // Soft peach
    input: "rgba(255, 255, 255, 0.2)",  // Slightly transparent input field
    borderColor: "#C5C5C5",  // Light border color
    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",  // Glass morph shadow
    backdropFilter: "blur(10px)",  // Glassmorphism effect
};

// Dark Mode Theme Colors
const darkMode = {
    background: "rgba(48, 48, 48, 0.3)",  // Dark background with glassmorphism
    text: "#F3BDBD",  // Soft peach for text
    button: "#608F69",  // Mint green
    input: "rgba(48, 48, 48, 0.2)",  // Dark transparent input field
    borderColor: "#666666",  // Darker border color
    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.5)",  // Glass morph shadow
    backdropFilter: "blur(10px)",  // Glassmorphism effect
};

export default function AuthPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [isLogin, setIsLogin] = useState(true);  // Toggle between login and signup
    const [message, setMessage] = useState('');     // Store success message
    const [isDarkMode, setIsDarkMode] = useState(false);  // Track dark/bright mode

    // Function to switch between themes
    const handleThemeToggle = () => {
        setIsDarkMode(!isDarkMode);
    };

    // Choose the theme based on the mode
    const theme = isDarkMode ? darkMode : brightMode;

    const handleAuth = async () => {
        try {
            if (isLogin) {
                // Handle login
                const { error } = await supabase.auth.signInWithPassword({ email, password });
                if (error) throw error;
                setMessage('Login successful!');  // Set success message
            } else {
                // Handle signup
                const { error } = await supabase.auth.signUp({ email, password });
                if (error) throw error;
                setMessage('Signup successful! Please check your email.');
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <Box
            sx={{
                maxWidth: '400px',
                margin: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                padding: 4,
                boxShadow: theme.boxShadow,  // Glass morph shadow effect
                borderRadius: 2,
                bgcolor: theme.background,  // Apply background from theme
                color: theme.text,  // Apply text color from theme
                borderColor: theme.borderColor,
                backdropFilter: theme.backdropFilter,  // Glass morph effect
                transition: 'background-color 0.3s ease, color 0.3s ease',  // Smooth theme transition
            }}
        >
            <Button onClick={handleThemeToggle} variant="outlined" sx={{ marginBottom: 2, color: theme.text }}>
                {isDarkMode ? "Switch to Bright Mode" : "Switch to Dark Mode"}
            </Button>

            <Typography variant="h4" component="h1" textAlign="center" sx={{ color: theme.text }}>
                {isLogin ? 'Login' : 'Sign Up'}
            </Typography>

            <TextField
                label="Email"
                variant="outlined"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                sx={{
                    input: { color: theme.text },
                    bgcolor: theme.input,  // Input background
                    borderColor: theme.borderColor,
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: theme.borderColor,
                        },
                        '&:hover fieldset': {
                            borderColor: theme.text,
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: theme.text,
                        },
                    },
                }}
            />

            <TextField
                label="Password"
                variant="outlined"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                sx={{
                    input: { color: theme.text },
                    bgcolor: theme.input,  // Input background
                    borderColor: theme.borderColor,
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: theme.borderColor,
                        },
                        '&:hover fieldset': {
                            borderColor: theme.text,
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: theme.text,
                        },
                    },
                }}
            />

            {error && (
                <Alert severity="error" sx={{ color: theme.text }}>
                    {error}
                </Alert>
            )}

            {message && (
                <Alert severity="success" sx={{ color: theme.text }}>
                    {message}
                </Alert>
            )}

            <Button
                variant="contained"
                onClick={handleAuth}
                fullWidth
                sx={{ bgcolor: theme.button, color: theme.text }}
            >
                {isLogin ? 'Login' : 'Sign Up'}
            </Button>

            <Typography variant="body2" textAlign="center" sx={{ color: theme.text }}>
                {isLogin ? "Don’t have an account?" : "Already have an account?"}
                <Button onClick={() => setIsLogin(!isLogin)} variant="text" sx={{ color: theme.text }}>
                    {isLogin ? "Sign Up" : "Login"}
                </Button>
            </Typography>
        </Box>
    );
}