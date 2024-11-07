// app/blog/create/page.jsx
"use client";
import React, { useState, useEffect } from 'react';
import {
    Container,
    Typography,
    Button,
    TextField,
} from '@mui/material';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '../../../lib/supabaseClient';

export default function CreateOrEditBlogPage() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image_url, setImageUrl] = useState('');
    const [user, setUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();
    const blogId = searchParams.get('id');

    useEffect(() => {
        async function fetchSession() {
            const {
                data: { session },
            } = await supabase.auth.getSession();
            if (!session) {
                // Redirect to login if not logged in
                router.push(`/login?redirect=/blog/create${blogId ? `?id=${blogId}` : ''}`);
            } else {
                setUser(session.user);
            }
        }
        fetchSession();
    }, []);

    useEffect(() => {
        if (blogId) {
            setIsEditing(true);
            // Fetch the blog details for editing
            async function fetchBlog() {
                try {
                    const response = await fetch(`/api/blog/${blogId}`);
                    const data = await response.json();
                    if (data.user_id !== user.id) {
                        // Redirect if the user is not the author
                        router.push('/blog');
                    } else {
                        setTitle(data.title);
                        setContent(data.content);
                        setImageUrl(data.image_url);
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
                image_url,
            };

            const url = isEditing ? `/api/blog/${blogId}` : '/api/blog';
            const method = isEditing ? 'PUT' : 'POST';

            const { data: { session } } = await supabase.auth.getSession();

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${session.access_token}`, // Include the access token
                },
                body: JSON.stringify(blogData),
            });
            if (response.ok) {
                router.push('/blog');
            } else {
                console.error('Failed to save blog');
            }
        } catch (error) {
            console.error('Error saving blog:', error);
        }
    };

    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>
                {isEditing ? 'Edit Blog Post' : 'Create a New Blog Post'}
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    fullWidth
                    label="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    sx={{ mb: 2 }}
                />
                <TextField
                    fullWidth
                    label="Image URL"
                    value={image_url}
                    onChange={(e) => setImageUrl(e.target.value)}
                    sx={{ mb: 2 }}
                />
                <TextField
                    fullWidth
                    label="Content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    multiline
                    rows={10}
                    required
                    sx={{ mb: 2 }}
                />
                <Button variant="contained" color="primary" type="submit">
                    {isEditing ? 'Update' : 'Publish'}
                </Button>
            </form>
        </Container>
    );
}
