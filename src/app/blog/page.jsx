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

export default function BlogPage() {
    const [blogs, setBlogs] = useState([
        { id: 1, title: "5 Tips for Glowing Skin", content: "Discover these top skincare tips to keep your skin radiant...", author: "Sarah Ali" },
        { id: 2, title: "Understanding Your Skin Type", content: "A guide to help you determine your skin type and choose the right products...", author: "Omar Raza" },
        { id: 3, title: "The Benefits of Vitamin C", content: "Vitamin C is a powerful antioxidant that can brighten your skin...", author: "Mariam Zaidi" },
        { id: 4, title: "Winter Skincare Essentials", content: "Keep your skin hydrated and protected during the colder months...", author: "Ayesha Khan" },
        { id: 5, title: "The Truth About Sunscreen", content: "Why you should wear sunscreen daily, even indoors...", author: "Bilal Mustafa" }
    ]);
    const [showBlogForm, setShowBlogForm] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

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

            <Button variant="outlined" onClick={handleAddBlogClick}>
                Write a New Blog Post
            </Button>

            {showBlogForm && (
                <BlogForm onSubmit={handleSubmitBlogForm} onCancel={handleCancelBlogForm} />
            )}

            {/* Blog Section with List of Filtered Blogs */}
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
