"use client";

import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Button,
    Card,
    CardContent,
    TextField,
    InputAdornment,
} from '@mui/material';
import Link from 'next/link';
import SearchIcon from '@mui/icons-material/Search';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';

export default function CustomerBlogs() {
    const [blogs, setBlogs] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const router = useRouter();

    // Fetch user's blogs
    useEffect(() => {
        async function fetchUserBlogs() {
            try {
                const response = await fetch('/api/blog', {
                    method: 'GET',
                    credentials: 'include', // Ensure cookies are sent
                });
                const data = await response.json();

                // Filter blogs that belong to the user
                const userBlogs = data.filter(blog => blog.user_id === data.user?.id);
                setBlogs(userBlogs);
            } catch (error) {
                console.error('Error fetching user blogs:', error);
            }
        }
        fetchUserBlogs();
    }, []);

    const handleDeleteBlog = async (blogId) => {
        try {
            const deleteResponse = await fetch(`/api/blog/${blogId}`, {
                method: 'DELETE',
                credentials: 'include', // Ensure cookies are sent
            });

            if (deleteResponse.ok) {
                setBlogs(blogs.filter((blog) => blog.id !== blogId));
            } else {
                const errorData = await deleteResponse.json();
                console.error('Failed to delete blog:', errorData.error);
                // Optionally, display error to the user (e.g., via a toast notification)
            }
        } catch (error) {
            console.error('Error deleting blog:', error);
        }
    };

    // Filter blogs based on search query
    const filteredBlogs = blogs.filter(blog =>
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.content.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <Box sx={{ mt: 4 }}>
            {/* Blogs Header and Create Button */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h5">
                    Your Blogs
                </Typography>
                <Button variant="outlined" onClick={() => router.push('/blog/create')}>
                    Write a New Blog Post
                </Button>
            </Box>

            {/* Search Bar */}
            <TextField
                label="Search your blogs..."
                fullWidth
                margin="normal"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    ),
                }}
            />

            {/* Blogs List */}
            {filteredBlogs.length > 0 ? (
                filteredBlogs.map((blog) => (
                    <Card key={blog.id} sx={{ mb: 3 }}>
                        <CardContent>
                            <Typography variant="h5" component="div" gutterBottom>
                                {blog.title}
                            </Typography>
                            <Typography variant="body1" color="text.secondary" paragraph>
                                {blog.content}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                                By {blog.author_name || 'You'} on{' '}
                                {format(new Date(blog.created_at), 'MMMM dd, yyyy')}
                            </Typography>
                            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center', gap: 2 }}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() =>
                                        router.push(`/blog/create?id=${blog.id}`)
                                    }
                                >
                                    Edit
                                </Button>
                                <Button
                                    variant="outlined"
                                    color="error"
                                    onClick={() => handleDeleteBlog(blog.id)}
                                >
                                    Delete
                                </Button>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                                <Link href={`/blog/${blog.id}`} passHref>
                                    <Button variant="text" color="primary">
                                        Read More
                                    </Button>
                                </Link>
                            </Box>
                        </CardContent>
                    </Card>
                ))
            ) : (
                <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
                    You have not created any blogs yet.
                </Typography>
            )}
        </Box>
    );
}
