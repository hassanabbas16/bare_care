"use client";
import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, Card, CardContent, Box, TextField } from '@mui/material';
import Link from 'next/link';

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

export default function BlogPage() {
    const [blogs, setBlogs] = useState([]);
    const [showBlogForm, setShowBlogForm] = useState(false);

    // Fetch all blogs from API
    useEffect(() => {
        async function fetchBlogs() {
            try {
                const response = await fetch('/api/posts');
                const data = await response.json();
                setBlogs(data);
            } catch (error) {
                console.error('Error fetching blogs:', error);
            }
        }
        fetchBlogs();
    }, []);

    const handleAddBlogClick = () => setShowBlogForm(true);
    const handleCancelBlogForm = () => setShowBlogForm(false);

    const handleSubmitBlogForm = async (newBlog) => {
        try {
            const response = await fetch('/api/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newBlog),
            });

            if (response.ok) {
                const addedBlog = await response.json();
                setBlogs([...blogs, addedBlog]); // Update blog list with new one
                setShowBlogForm(false); // Close the form
            } else {
                console.error('Failed to add blog');
            }
        } catch (error) {
            console.error('Error submitting blog:', error);
        }
    };

    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>
                Skincare Blogs
            </Typography>

            <Button variant="outlined" onClick={handleAddBlogClick}>
                Write a New Blog Post
            </Button>

            {showBlogForm && (
                <BlogForm onSubmit={handleSubmitBlogForm} onCancel={handleCancelBlogForm} />
            )}

            <Box sx={{ mt: 4 }}>
                {blogs.map((blog) => (
                    <Card key={blog.id} sx={{ mb: 3 }}>
                        <CardContent>
                            <Typography variant="h5" component="div">
                                {blog.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {blog.content.substring(0, 100)}...
                            </Typography>
                            <Link href={`/blog/${blog.id}`}>
                                <Button>Read More</Button>
                            </Link>
                        </CardContent>
                    </Card>
                ))}
            </Box>
        </Container>
    );
}
