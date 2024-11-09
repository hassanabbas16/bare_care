"use client";

import React, { useState, useEffect } from 'react';
import {
    Container,
    Typography,
    Button,
    Card,
    CardContent,
    Box,
    TextField,
    InputAdornment,
    Grid,
    IconButton,
} from '@mui/material';
import { useTheme } from "../../contexts/themeContext";
import Link from 'next/link';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';
import FloatingCircle from '../../components/common/FloatingCircle';

export default function BlogPage() {
    const { theme } = useTheme();
    const [blogs, setBlogs] = useState([]);
    const [user, setUser] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const router = useRouter();

    useEffect(() => {
        async function fetchSession() {
            try {
                const response = await fetch('/api/auth/session', {
                    method: 'GET',
                    credentials: 'include',
                });
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

    useEffect(() => {
        async function fetchBlogs() {
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
        fetchBlogs();
    }, []);

    const handleCreateBlog = () => {
        if (user) {
            router.push('/blog/create');
        } else {
            router.push('/login?redirect=/blog/create');
        }
    };

    const filteredBlogs = blogs.filter(blog =>
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.content.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4, paddingTop: "6rem", position: 'relative' }}>
            <FloatingCircle size="400px" top="-10%" left="-40%" dark />
            <FloatingCircle size="500px" top="40%" right="-20%" />
            <FloatingCircle size="600px" bottom="0" left="-10%" />

            <Typography gutterBottom sx={{ fontSize: '4.4rem', textAlign: 'center', color: theme.palette.mode === 'dark' ? '#FFF' : '#000' }}>
                Skincare Blogs
            </Typography>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                <TextField
                    label="Search blog keywords..."
                    sx={{ width: '40%' }}
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
                <Button
                    variant="outlined"
                    onClick={handleCreateBlog}
                    sx={{
                        padding: '0.8rem 1.5rem',
                        fontSize: '2rem',
                        fontWeight: 'bold',
                    }}
                >
                    Write a New Blog Post
                </Button>
            </Box>

            <Grid container spacing={3} sx={{ mt: 4, mb: 8 }}>
                {filteredBlogs.length > 0 ? (
                    filteredBlogs.map((blog, index) => (
                        <Grid item xs={12} sm={6} md={4} key={blog.id}>
                            <Card
                                sx={{
                                    maxHeight: '400px',
                                    minHeight: '300px',
                                    borderRadius: "24px",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "space-between",
                                    padding: "3rem",
                                    backgroundColor: theme.palette.mode === 'light' ? '#fff' : 'transparent',
                                    color: theme.palette.mode === "light" ? '#212121' : '#fff',
                                    boxShadow: theme.palette.mode === 'light' ? "0px 4px 12px rgba(0, 0, 0, 0.1)" : "none",
                                    animation: `slideInLTR 1s ease-in-out ${1.5 - 0.3 * index}s forwards`,
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
                                            WebkitLineClamp: 4, // Limits text to 4 lines
                                        }}
                                    >
                                        {blog.content}
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        By {blog.author_name || 'Anonymous'} on{' '}
                                        {format(new Date(blog.created_at), 'MMMM dd, yyyy')}
                                    </Typography>
                                </CardContent>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                                    <Link href={`/blog/${blog.id}`} passHref>
                                        <Button variant="contained" color="primary">
                                            Read More
                                        </Button>
                                    </Link>
                                    <Box sx={{ display: 'flex', alignItems: 'center', color: 'error.main' }}>
                                        <FavoriteIcon sx={{ fontSize: '1.5rem', mr: 0.5 }} />
                                        <Typography variant="body2" color="text.secondary">
                                            {blog.likes || 0}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Card>
                        </Grid>
                    ))
                ) : (
                    <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
                        No blogs found matching your search.
                    </Typography>
                )}
            </Grid>
        </Container>
    );
}
