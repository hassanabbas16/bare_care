"use client";

import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Typography, Alert, IconButton, InputAdornment, MenuItem, Card, useTheme } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useRouter } from 'next/navigation';

const AuthPage = () => {
    const theme = useTheme();
    const router = useRouter();
    const [redirectUrl, setRedirectUrl] = useState('/dashboard'); // Default redirect
    const [isSignup, setIsSignup] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        age: '',
        gender: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [feedback, setFeedback] = useState({ type: '', message: '' });

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const redirect = params.get('redirect');
        if (redirect) {
            setRedirectUrl(redirect);
        }
    }, []);

    const toggleForm = () => setIsSignup((prev) => !prev);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePasswordToggle = () => {
        setShowPassword((prev) => !prev);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFeedback({ type: '', message: '' });

        const endpoint = isSignup ? '/api/auth/signup' : '/api/auth/signin';

        const payload = {
            email: formData.email,
            password: formData.password,
            ...(isSignup && {
                firstName: formData.firstName,
                lastName: formData.lastName,
                age: formData.age,
                gender: formData.gender,
            }),
        };

        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            const result = await response.json();

            if (!response.ok) {
                setFeedback({ type: 'error', message: result.error });
                return;
            }

            if (isSignup) {
                setFeedback({ type: 'success', message: 'Signup successful! Please log in.' });
                setIsSignup(false);
            } else {
                setFeedback({ type: 'success', message: 'Login successful! Redirecting...' });
                setTimeout(() => {
                    router.push(redirectUrl);
                }, 2000);
            }
        } catch (error) {
            setFeedback({ type: 'error', message: 'An error occurred, please try again.' });
        }
    };

    return (
        <Box sx={{
            display: 'flex',
            minHeight: '100vh',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            position: 'relative'
        }}>
            {/* Background Grid with BARE CARE text */}
            <Box
                sx={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    top: 0,
                    left: 0,
                    zIndex: 0,
                    display: "grid",
                    gridTemplateColumns: "repeat(4, 1fr)",
                    gridTemplateRows: "repeat(10, 1fr)",
                    justifyItems: "center",
                    alignItems: "center",
                    gap: "1rem",
                }}
            >
                {[...Array(40)].map((_, index) => (
                    <Typography
                        key={index}
                        variant="h1"
                        sx={{
                            fontSize: {
                                xs: '3rem',
                                sm: '4rem',
                                md: '5rem',
                                lg: '6rem',
                            },
                            fontWeight: 'bold',
                            color: theme.palette.mode === 'dark' ? '#FFF' : '#000',
                            opacity: 0.05,
                        }}
                    >
                        BARE CARE.
                    </Typography>
                ))}
            </Box>

            {/* Vertical Scrolling Text Borders */}
            <Box sx={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: 0,
                width: '5rem',
                backgroundColor: 'black',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '1rem',
                fontWeight: 'bold',
                overflow: 'hidden',
                writingMode: 'vertical-rl',
                textOrientation: 'upright'
            }}>
                <Box sx={{whiteSpace: 'nowrap', animation: 'scrollTextVerticalLeft 2000s linear infinite'}}>
                    {Array(2000).fill('Bare Care. ').join('')}
                </Box>
            </Box>
            <Box sx={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                right: 0,
                width: '5rem',
                backgroundColor: 'black',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '1rem',
                fontWeight: 'bold',
                overflow: 'hidden',
                writingMode: 'vertical-rl',
                textOrientation: 'upright'
            }}>
                <Box sx={{whiteSpace: 'nowrap', animation: 'scrollTextVerticalRight 2000s linear infinite'}}>
                    {Array(2000).fill('Bare Care. ').join('')}
                </Box>
            </Box>

            {/* Form Section */}
            <Card
                sx={{
                    position: 'relative',
                    zIndex: 1,
                    width: '90%',
                    maxWidth: 400,
                    padding: 4,
                    transition: 'opacity 0.5s ease',
                    opacity: isSignup ? 0.95 : 1,
                }}
            >
                <Typography variant="h5" component="h1" gutterBottom>
                    {isSignup ? 'Sign Up' : 'Login'}
                </Typography>

                {feedback.message && (
                    <Alert severity={feedback.type} sx={{mb: 2}}>
                        {feedback.message}
                    </Alert>
                )}

                {isSignup && (
                    <>
                        <TextField
                            label="First Name"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            required
                        />
                        <TextField
                            label="Last Name"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            required
                        />
                        <TextField
                            label="Age"
                            name="age"
                            type="number"
                            value={formData.age}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            required
                        />
                        <TextField
                            select
                            label="Gender"
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            required
                        >
                            <MenuItem value="male">Male</MenuItem>
                            <MenuItem value="female">Female</MenuItem>
                            <MenuItem value="other">Other</MenuItem>
                        </TextField>
                    </>
                )}

                <TextField
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    required
                />
                <TextField
                    label="Password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    required
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={handlePasswordToggle}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff/> : <Visibility/>}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
                <Button type="submit" variant="contained" fullWidth sx={{mt: 2}} onClick={handleSubmit}>
                    {isSignup ? 'Sign Up' : 'Login'}
                </Button>
                <Button
                    onClick={toggleForm}
                    variant="text"
                    fullWidth
                    sx={{mt: 1}}
                >
                    {isSignup ? 'Already have an account? Login' : "Don't have an account? Sign Up"}
                </Button>
            </Card>
            <style jsx global>{`
                @keyframes scrollTextHorizontal {
                    0% {
                        transform: translateX(0);
                    }
                    100% {
                        transform: translateX(-100%);
                    }
                }

                @keyframes scrollTextVerticalLeft {
                    0% {
                        transform: translateY(0);
                    }
                    100% {
                        transform: translateY(-100%);
                    }
                }

                @keyframes scrollTextVerticalRight {
                    0% {
                        transform: translateY(0);
                    }
                    100% {
                        transform: translateY(-100%);
                    }
                }
            `}</style>
        </Box>
    );
};

export default AuthPage;
