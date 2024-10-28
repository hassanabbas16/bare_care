"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { Box, Button, TextField, Typography, Alert, IconButton, InputAdornment, MenuItem, Card, useTheme } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { supabase } from '../../lib/supabaseClient';

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

        if (isSignup) {
            const { data, error } = await supabase.auth.signUp({
                email: formData.email,
                password: formData.password,
                options: {
                    data: {
                        first_name: formData.firstName,
                        last_name: formData.lastName,
                        display_name: `${formData.firstName} ${formData.lastName}`,
                    },
                },
            });

            if (error) {
                setFeedback({ type: 'error', message: error.message });
                return;
            }

            if (data.user) {
                const { error: profileError } = await supabase
                    .from('profiles')
                    .insert([
                        {
                            id: data.user.id,
                            first_name: formData.firstName,
                            last_name: formData.lastName,
                            age: formData.age,
                            gender: formData.gender,
                        },
                    ]);

                if (profileError) {
                    setFeedback({ type: 'error', message: profileError.message });
                    return;
                }

                setFeedback({ type: 'success', message: 'Signup successful! Please log in.' });
                setIsSignup(false);
            }
        } else {
            const { data, error } = await supabase.auth.signInWithPassword({
                email: formData.email,
                password: formData.password,
            });

            if (error) {
                setFeedback({ type: 'error', message: error.message });
                return;
            }

            if (data.session) {
                localStorage.setItem('supabase-session', JSON.stringify(data.session)); // Store session in localStorage
                setFeedback({ type: 'success', message: 'Login successful! Redirecting...' });
                setTimeout(() => {
                    window.location.href = '/dashboard';
                }, 3000);
            }
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
