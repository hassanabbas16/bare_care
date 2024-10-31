"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { Box, Button, TextField, Typography, Alert, IconButton, InputAdornment, MenuItem, Card, useTheme } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

import BrightImage from '../../public/login/Bright.png';
import DarkImage from '../../public/login/Dark.png';

const AuthPage = () => {
    const theme = useTheme();
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
                    window.location.href = '/dashboard';
                }, 3000);
            }
        } catch (error) {
            setFeedback({ type: 'error', message: 'An error occurred, please try again.' });
        }
    };

    return (
        <Box sx={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center' }}>
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    overflow: 'hidden',
                    backgroundColor: theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.7)' : 'rgba(0,0,0,0.7)',
                    zIndex: -1,
                }}
            >
                <Image
                    src={theme.palette.mode === 'dark' ? DarkImage : BrightImage}
                    alt="Background Image"
                    layout="fill"
                    objectFit="cover"
                    quality={100}
                    style={{ filter: 'blur(4px)', opacity: 0.5 }}
                />
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'rgba(255,255,255,0.2)',
                        fontSize: '4rem',
                        fontWeight: 'bold',
                        letterSpacing: '1rem',
                        textAlign: 'center',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        backgroundColor: theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.3)',
                    }}
                >
                    <Box>
                        BARECARE BARECARE BARECARE BARECARE
                    </Box>
                </Box>
            </Box>

            {/* Form Section */}
            <Card
                sx={{
                    position: 'relative',
                    zIndex: 1,
                    width: '80%',
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
                    <Alert severity={feedback.type} sx={{ mb: 2 }}>
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
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
                <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }} onClick={handleSubmit}>
                    {isSignup ? 'Sign Up' : 'Login'}
                </Button>
                <Button
                    onClick={toggleForm}
                    variant="text"
                    fullWidth
                    sx={{ mt: 1 }}
                >
                    {isSignup ? 'Already have an account? Login' : "Don't have an account? Sign Up"}
                </Button>
            </Card>
        </Box>
    );
};

export default AuthPage;
