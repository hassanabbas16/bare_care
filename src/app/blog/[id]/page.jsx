"use client";
import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, TextField, Card, CardContent, Box } from '@mui/material';

// Blog Post Page
export default function BlogPostPage({ params }) {
    const { id } = params;  // Get the blog post ID from dynamic route
    const [blog, setBlog] = useState(null);
    const [likes, setLikes] = useState(0);
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);

    // Fetch the blog post data
    useEffect(() => {
        async function fetchBlogData() {
            try {
                const response = await fetch(`/api/posts/${id}`);
                const data = await response.json();
                setBlog(data);
                setLikes(data.likes);  // Assuming the blog post includes the number of likes
                setComments(data.comments);  // Assuming the blog post includes an array of comments
            } catch (error) {
                console.error('Error fetching blog data:', error);
            }
        }
        if (id) fetchBlogData();
    }, [id]);

    // Function to handle like
    const handleLike = async () => {
        try {
            const response = await fetch(`/api/like/${id}`, {
                method: 'POST',
            });

            if (response.ok) {
                setLikes(likes + 1);
            } else {
                console.error('Failed to like the post');
            }
        } catch (error) {
            console.error('Error liking the post:', error);
        }
    };

    // Function to handle comment submission
    const handleCommentSubmit = async () => {
        try {
            const response = await fetch(`/api/comments/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ content: comment }),
            });

            if (response.ok) {
                const newComment = await response.json();
                setComments([...comments, newComment]);  // Update comments list
                setComment('');  // Clear comment input
            } else {
                console.error('Failed to submit comment');
            }
        } catch (error) {
            console.error('Error submitting comment:', error);
        }
    };

    if (!blog) {
        return <Typography>Loading...</Typography>;
    }

    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <Card>
                <CardContent>
                    <Typography variant="h4" gutterBottom>
                        {blog.title}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        {blog.content}
                    </Typography>

                    {/* Like Button */}
                    <Box sx={{ mt: 2 }}>
                        <Typography variant="body1">Likes: {likes}</Typography>
                        <Button variant="contained" onClick={handleLike}>Like</Button>
                    </Box>

                    {/* Comment Section */}
                    <Box sx={{ mt: 4 }}>
                        <Typography variant="h5" gutterBottom>Comments</Typography>
                        {comments.map((comment, index) => (
                            <Box key={index} sx={{ mt: 2 }}>
                                <Typography variant="body2">{comment.content}</Typography>
                            </Box>
                        ))}

                        {/* Add Comment */}
                        <Box sx={{ mt: 2 }}>
                            <TextField
                                fullWidth
                                label="Add a comment"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                multiline
                                rows={2}
                                variant="outlined"
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleCommentSubmit}
                                sx={{ mt: 2 }}
                            >
                                Submit Comment
                            </Button>
                        </Box>
                    </Box>
                </CardContent>
            </Card>
        </Container>
    );
}
