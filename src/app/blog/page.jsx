"use client";
import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, Card, CardContent, Box, TextField, InputAdornment } from '@mui/material';
import Link from 'next/link';
import SearchIcon from '@mui/icons-material/Search';

// Component for Blog Post Form
function BlogForm({ onSubmit, onCancel }) {
    const [newBlog, setNewBlog] = useState({
        title: '',
        content: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewBlog((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <Card sx={{ mt: 4, p: 4 }}>
            <Typography variant="h5">Write a New Blog Post</Typography>
            <TextField
                fullWidth
                label="Title"
                margin="normal"
                name="title"
                value={newBlog.title}
                onChange={handleChange}
            />
            <TextField
                fullWidth
                label="Content"
                margin="normal"
                name="content"
                value={newBlog.content}
                onChange={handleChange}
                multiline
                rows={4}
            />
            <Box sx={{ mt: 2 }}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => onSubmit(newBlog)}
                    sx={{ mr: 2 }}
                >
                    Publish
                </Button>
                <Button variant="outlined" onClick={onCancel}>
                    Cancel
                </Button>
            </Box>
        </Card>
    );
}
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

    // Filter blogs based on search query
    const filteredBlogs = blogs.filter(blog =>
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.content.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
            {/* Swiping Text Banner */}
            <div
                style={{
                    position: "relative",
                    overflow: "hidden",
                    backgroundColor: "black",
                    color: "white",
                    padding: "10px 0",
                    width: "100vw",
                    marginLeft: "calc(-50vw + 50%)",
                    marginTop: "64px",
                    marginBottom: "24px",
                    whiteSpace: "nowrap",
                }}
            >
                <div
                    style={{
                        display: "inline-block",
                        animation: "marquee 20s linear infinite",
                    }}
                >
                    Dive into our skincare world! Discover fresh ideas, trusted routines, and everything you need to know about keeping your skin radiant.
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    Dive into our skincare world! Discover fresh ideas, trusted routines, and everything you need to know about keeping your skin radiant.
                </div>
            </div>

            {/* Search Bar with Magnifying Glass Icon */}
            <TextField
                label="Search blog keywords..."
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

            {/* Skincare Blogs Header and Button */}
            <Typography variant="h4" gutterBottom>
                Skincare Blogs
            </Typography>
            <Button variant="outlined" onClick={handleCreateBlog}>
                Write a New Blog Post
            </Button>

            {showBlogForm && (
                <BlogForm onSubmit={handleSubmitBlogForm} onCancel={handleCancelBlogForm} />
            )}

            {/* Blog Section with List of Filtered Blogs */}
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
                {filteredBlogs.length > 0 ? (
                    filteredBlogs.map((blog) => (
                        <Card key={blog.id} sx={{ mb: 3 }}>
                            <CardContent>
                                <Typography variant="h5" component="div">
                                    {blog.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {blog.content.substring(0, 100)}...
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                    by {blog.author}
                                </Typography>
                                <Link href={`/blog/${blog.id}`}>
                                    <Button>Read More</Button>
                                </Link>
                            </CardContent>
                        </Card>
                    ))
                ) : (
                    <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
                        No blogs found matching your search.
                    </Typography>
                )}
            </Box>

            {/* Adding CSS for Marquee Animation */}
            <style jsx>{`
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
            `}</style>
        </Container>
    );
}
