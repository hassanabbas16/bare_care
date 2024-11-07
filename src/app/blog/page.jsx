"use client";
import React, { useState, useEffect } from 'react';
import {
    Container,
    Typography,
    Button,
    Card,
    CardContent,
    CardMedia,
    Box,
} from '@mui/material';
import Grid from "@mui/material/Grid2";
import Link from 'next/link';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';

export default function BlogPage() {
    const [blogs, setBlogs] = useState([]);
    const [userBlogs, setUserBlogs] = useState([]);
    const [user, setUser] = useState(null);
    const router = useRouter();

    // Fetch user session
    useEffect(() => {
        async function fetchSession() {
            try {
                const response = await fetch('/api/auth/session');
                const data = await response.json();

                if (data.loggedIn) {
                    setUser(data.user);
                }
            } catch (error) {
                console.error('Error fetching session:', error);
            }
        }
        fetchSession();
    }, []);

    // Fetch all blogs
    useEffect(() => {
        async function fetchBlogs() {
            try {
                const response = await fetch('/api/blog');
                const data = await response.json();
                setBlogs(data);
            } catch (error) {
                console.error('Error fetching blogs:', error);
            }
        }
        fetchBlogs();
    }, []);

    // Filter user's own blogs
    useEffect(() => {
        if (user) {
            const userId = user.id;
            const userOwnedBlogs = blogs.filter((blog) => blog.user_id === userId);
            setUserBlogs(userOwnedBlogs);
        }
    }, [user, blogs]);

    const handleCreateBlog = () => {
        if (user) {
            router.push('/blog/create');
        } else {
            router.push('/login?redirect=/blog/create');
        }
    };

    const handleDeleteBlog = async (blogId) => {
        try {
            const response = await fetch('/api/auth/session');
            const sessionData = await response.json();

            if (!sessionData.loggedIn) {
                router.push('/login?redirect=/blog');
                return;
            }

            const deleteResponse = await fetch(`/api/blog/${blogId}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${sessionData.user.access_token}`,
                },
            });

            if (deleteResponse.ok) {
                setBlogs(blogs.filter((blog) => blog.id !== blogId));
                setUserBlogs(userBlogs.filter((blog) => blog.id !== blogId));
            } else {
                console.error('Failed to delete blog');
            }
        } catch (error) {
            console.error('Error deleting blog:', error);
        }
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>
                Skincare Blogs
            </Typography>
            <Button variant="outlined" onClick={handleCreateBlog}>
                Write a New Blog Post
            </Button>

            {/* User's Blogs Section */}
            {user && userBlogs.length > 0 && (
                <Box sx={{ mt: 4 }}>
                    <Typography variant="h5" gutterBottom>
                        Your Blogs
                    </Typography>
                    <Grid container spacing={4}>
                        {userBlogs.map((blog) => (
                            <Grid item xs={12} sm={6} md={4} key={blog.id}>
                                <Card
                                    sx={{
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                    }}
                                >
                                    {blog.image_url && (
                                        <CardMedia
                                            component="img"
                                            image={blog.image_url}
                                            alt={blog.title}
                                            height="200"
                                        />
                                    )}
                                    <CardContent>
                                        <Typography variant="h5" component="div" gutterBottom>
                                            {blog.title}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                            paragraph
                                        >
                                            {blog.content.substring(0, 100)}...
                                        </Typography>
                                        <Typography variant="caption" color="text.secondary">
                                            By {blog.author_name || 'You'} on{' '}
                                            {format(new Date(blog.created_at), 'MMMM dd, yyyy')}
                                        </Typography>
                                        <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
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
                                        <Link href={`/blog/${blog.id}`}>
                                            <Button sx={{ mt: 2 }} variant="text">
                                                Read More
                                            </Button>
                                        </Link>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            )}

            {/* All Blogs Section */}
            <Box sx={{ mt: 4 }}>
                <Typography variant="h5" gutterBottom>
                    All Blogs
                </Typography>
                <Grid container spacing={4}>
                    {blogs.map((blog) => (
                        <Grid item xs={12} sm={6} md={4} key={blog.id}>
                            <Card
                                sx={{
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                }}
                            >
                                {blog.image_url && (
                                    <CardMedia
                                        component="img"
                                        image={blog.image_url}
                                        alt={blog.title}
                                        height="200"
                                    />
                                )}
                                <CardContent>
                                    <Typography variant="h5" component="div" gutterBottom>
                                        {blog.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" paragraph>
                                        {blog.content.substring(0, 100)}...
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        By {blog.author_name || 'Anonymous'} on{' '}
                                        {format(new Date(blog.created_at), 'MMMM dd, yyyy')}
                                    </Typography>
                                    <Link href={`/blog/${blog.id}`}>
                                        <Button sx={{ mt: 2 }} variant="contained" color="primary">
                                            Read More
                                        </Button>
                                    </Link>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Container>
    );
}
