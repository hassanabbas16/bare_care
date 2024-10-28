"use client";
import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Paper, Alert, IconButton, InputAdornment, MenuItem } from '@mui/material';
import Grid from "@mui/material/Grid2";
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { supabase } from '../../lib/supabaseClient';

// Import images from the public folder
import BrightImage from '../../public/login/Bright.png';
import DarkImage from '../../public/login/Dark.png';

const AuthPage = () => {
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
        setFeedback({ type: '', message: '' }); // Reset feedback before submission

        if (isSignup) {
            // Signup logic
            const { data, error } = await supabase.auth.signUp({
                email: formData.email,
                password: formData.password,
                options: {
                    data: {
                        first_name: formData.firstName,
                        last_name: formData.lastName,
                        display_name: `${formData.firstName} ${formData.lastName}`, // Set display name in auth.users
                    },
                },
            });

            if (error) {
                setFeedback({ type: 'error', message: error.message });
                return;
            }

            // Insert into profiles table
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
            setIsSignup(false); // Redirect to login form instead of homepage
        } else {
            // Login logic
            const { data, error } = await supabase.auth.signInWithPassword({
                email: formData.email,
                password: formData.password,
            });

            if (error) {
                setFeedback({ type: 'error', message: error.message });
                return;
            }

            // Save JWT token and user ID for future use
            const { session } = data;
            if (session) {
                localStorage.setItem('token', session.access_token);
                localStorage.setItem('user_id', session.user.id);
            }

            setFeedback({ type: 'success', message: 'Login successful! Redirecting...' });
            setTimeout(() => {
                window.location.href = '/dashboard';
            }, 1500); // Redirect after a short delay
        }
    };

    return (
        <Grid container sx={{ height: '100vh' }}>
            <Grid item xs={12} md={6}>
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="100%"
                    sx={{
                        backgroundImage: `url(${isSignup ? DarkImage.src : BrightImage.src})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <Paper elevation={6} sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Box component="form" onSubmit={handleSubmit} sx={{ width: '80%', maxWidth: 400 }}>
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
                        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
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
                    </Box>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default AuthPage;
