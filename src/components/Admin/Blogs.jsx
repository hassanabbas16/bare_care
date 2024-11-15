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
import Grid from "@mui/material/Grid2";
import { useRouter } from 'next/navigation';
import SearchIcon from '@mui/icons-material/Search';
import Link from 'next/link';
import { format } from 'date-fns';

export default function AdminBlogs() {
    const [blogs, setBlogs] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const router = useRouter();

    useEffect(() => {
        async function fetchAllBlogs() {
            try {
                const response = await fetch('/api/blog', {
                    method: 'GET',
                    credentials: 'include',
                });
                const data = await response.json();
                setBlogs(data);
            } catch (error) {
                console.error('Error fetching blogs:', error);
            }
        }
        fetchAllBlogs();
    }, []);

    const handleDeleteBlog = async (blogId) => {
        try {
            const deleteResponse = await fetch(`/api/blog/${blogId}`, {
                method: 'DELETE',
                credentials: 'include',
            });

            if (deleteResponse.ok) {
                setBlogs(blogs.filter((blog) => blog.id !== blogId));
            } else {
                const errorData = await deleteResponse.json();
                console.error('Failed to delete blog:', errorData.error);
            }
        } catch (error) {
            console.error('Error deleting blog:', error);
        }
    };

    const filteredBlogs = blogs.filter(blog =>
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.content.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <Box sx={{ mt: 4, padding: "3rem" }}>
            <Typography sx={{ fontWeight: 'bold', fontSize: '2.4rem', mb: 2, color: "black" }}>
                All Blogs
            </Typography>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <TextField
                    label="Search blogs..."
                    variant="outlined"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                    sx={{ flex: 1, mr: 2 }}
                />
                <Button
                    variant="outlined"
                    onClick={() => router.push('/blog/create')}
                    sx={{ padding: '0.8rem 1.5rem', fontSize: '1rem', fontWeight: 'bold' }}
                >
                    Create New Blog
                </Button>
            </Box>

            <Grid container spacing={3} sx={{ mt: 2, maxWidth: "100%", mx: "auto", display: "flex", justifyContent: "center", alignItems: "center" }}>
                {filteredBlogs.length > 0 ? (
                    filteredBlogs.map((blog) => (
                        <Grid item xs={12} sm={6} md={4} key={blog.id}>
                            <Card
                                sx={{
                                    maxHeight: '400px',
                                    minHeight: '300px',
                                    maxWidth: "300px",
                                    borderRadius: "24px",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "space-between",
                                    padding: "3rem",
                                    backgroundColor: '#fff',
                                    color: '#212121',
                                    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                                }}
                            >
                                <CardContent>
                                    <Typography variant="h5" component="div" gutterBottom>
                                        {blog.title}
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        color="text.secondary"
                                        paragraph
                                        sx={{
                                            display: '-webkit-box',
                                            WebkitBoxOrient: 'vertical',
                                            overflow: 'hidden',
                                            WebkitLineClamp: 4,
                                        }}
                                    >
                                        {blog.content}
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        By {blog.author_name || 'Anonymous'} on {format(new Date(blog.created_at), 'MMMM dd, yyyy')}
                                    </Typography>
                                </CardContent>

                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                                    <Link href={`/blog/${blog.id}`} passHref>
                                        <Button variant="text" color="primary">Read More</Button>
                                    </Link>
                                    <Box sx={{ display: 'flex', gap: 1 }}>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() => router.push(`/blog/create?id=${blog.id}`)}
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
                                </Box>
                            </Card>
                        </Grid>
                    ))
                ) : (
                    <Typography color="text.secondary" sx={{ mt: 2, fontSize: "1.5rem", textAlign: "center" }}>
                        No blogs found.
                    </Typography>
                )}
            </Grid>
        </Box>
    );
}
