"use client";
import React, { useState, useEffect } from 'react';
import {
    Container,
    Typography,
    Button,
    TextField,
    Card,
    Box,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { supabase } from '../../../lib/supabaseClient';
import FloatingCircle from "../../../components/common/FloatingCircle";
import { useTheme } from "../../../contexts/themeContext";

export default function CreateOrEditBlogPage() {
    const { theme } = useTheme();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [user, setUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [blogId, setBlogId] = useState(null); // Move blogId to state
    const router = useRouter();

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search); // Get query params manually
        const id = urlParams.get('id');
        setBlogId(id);
    }, []);

    useEffect(() => {
        const fetchSession = async () => {
            try {
                const response = await fetch("/api/auth/session");
                const data = await response.json();
                if (!data.loggedIn) {
                    router.push(`/login?redirect=/blog/create${blogId ? `?id=${blogId}` : ""}`);
                } else {
                    setUser(data.user);
                }
            } catch (error) {
                console.error("Error fetching session:", error);
                router.push(`/login?redirect=/blog/create${blogId ? `?id=${blogId}` : ""}`);
            }
        };

        fetchSession();
    }, [blogId, router]);

    useEffect(() => {
        if (blogId) {
            setIsEditing(true);
            async function fetchBlog() {
                try {
                    const response = await fetch(`/api/blog/${blogId}`);
                    const data = await response.json();
                    if (data.user_id !== user?.id) {
                        router.push('/blog');
                    } else {
                        setTitle(data.title);
                        setContent(data.content);
                    }
                } catch (error) {
                    console.error('Error fetching blog:', error);
                }
            }
            if (user) {
                fetchBlog();
            }
        }
    }, [blogId, user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const blogData = {
                title,
                content,
            };

            const url = isEditing ? `/api/blog/${blogId}` : '/api/blog';
            const method = isEditing ? 'PUT' : 'POST';

            const { data: { session } } = await supabase.auth.getSession();

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${session.access_token}`,
                },
                body: JSON.stringify(blogData),
            });
            if (response.ok) {
                router.push(isEditing ? '/dashboard' : '/blog');
            } else {
                const errorData = await response.json();
                console.error('Failed to save blog:', errorData.error);
            }
        } catch (error) {
            console.error('Error saving blog:', error);
        }
    };

    return (
        <Container maxWidth="md" sx={{ mt: 15, position: 'relative', alignItems: "center", justifyContent: "center" }}>
            <FloatingCircle size="400px" top="-45%" left="-70%" dark />
            <FloatingCircle size="500px" top="50%" right="-50%" />
            <Typography
                align="center"
                sx={{
                    fontWeight: 'bold',
                    mb: 3,
                    fontSize: "4rem",
                    color: theme.palette.mode === 'dark' ? '#FFF' : '#000'
                }}
            >
                {isEditing ? 'Edit Blog Post' : 'Create a New Blog Post'}
            </Typography>

            <Card sx={{
                padding: 4,
                borderRadius: "16px",
                boxShadow: theme.palette.mode === 'light'
                    ? "0px 8px 24px rgba(0, 0, 0, 0.1)"
                    : "0px 8px 24px rgba(255, 255, 255, 0.1)",
                backgroundColor: theme.palette.mode === 'light' ? '#fff' : '#1a1a1a',
            }}>
                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="Blog Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        sx={{
                            mb: 3,
                            borderRadius: '8px',
                            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '8px',
                            },
                        }}
                    />
                    <TextField
                        fullWidth
                        label="Content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        multiline
                        rows={10}
                        required
                        sx={{
                            mb: 3,
                            borderRadius: '8px',
                            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '8px',
                            },
                        }}
                    />
                    <Box sx={{ textAlign: 'center' }}>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            sx={{
                                padding: '0.8rem 2.5rem',
                                fontSize: '1.1rem',
                                fontWeight: 'bold',
                                borderRadius: '8px',
                                backgroundColor: theme.palette.primary.main,
                                color: '#FFF',
                                '&:hover': {
                                    backgroundColor: theme.palette.primary.dark,
                                },
                            }}
                        >
                            {isEditing ? 'Update' : 'Publish'}
                        </Button>
                    </Box>
                </form>
            </Card>
        </Container>
    );
}
