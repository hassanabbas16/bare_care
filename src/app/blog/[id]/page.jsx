// app/blog/[id]/page.jsx
"use client";
import React, { useState, useEffect } from 'react';
import {
    Container,
    Typography,
    Button,
    TextField,
    Card,
    CardContent,
    CardMedia,
    Box,
    Divider,
} from '@mui/material';
import { format } from 'date-fns';
import { useRouter, useParams } from 'next/navigation';
import { supabase } from '../../../lib/supabaseClient';

export default function BlogPostPage() {
    const [blog, setBlog] = useState(null);
    const [likes, setLikes] = useState(0);
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);
    const [user, setUser] = useState(null);
    const router = useRouter();
    const params = useParams();
    const { id } = params;

    useEffect(() => {
        async function fetchBlogData() {
            try {
                const response = await fetch(`/api/blog/${id}`);
                const data = await response.json();
                setBlog(data);
                setLikes(data.likes || 0);

                // Fetch comments
                const commentsResponse = await fetch(`/api/blog/${id}/comment`);
                const commentsData = await commentsResponse.json();
                setComments(commentsData);
            } catch (error) {
                console.error('Error fetching blog data:', error);
            }
        }
        if (id) fetchBlogData();
    }, [id]);

    useEffect(() => {
        async function fetchSession() {
            const {
                data: { session },
            } = await supabase.auth.getSession();
            if (session) {
                setUser(session.user);
            }
        }
        fetchSession();
    }, []);

    const handleLike = async () => {
        try {
            const response = await fetch(`/api/blog/${id}/like`, {
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

    const handleCommentSubmit = async () => {
        try {
            const newComment = {
                content: comment,
                user_id: user ? user.id : null,
                username: user ? user.email : 'Anonymous',
            };
            const response = await fetch(`/api/blog/${id}/comment`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newComment),
            });
            if (response.ok) {
                const addedComment = await response.json();
                setComments([addedComment, ...comments]);
                setComment('');
            } else {
                console.error('Failed to submit comment');
            }
        } catch (error) {
            console.error('Error submitting comment:', error);
        }
    };

    const handleDeleteBlog = async () => {
        try {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) {
                router.push('/login?redirect=/blog');
                return;
            }
            const response = await fetch(`/api/blog/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${session.access_token}`,
                },
            });
            if (response.ok) {
                router.push('/blog');
            } else {
                console.error('Failed to delete blog');
            }
        } catch (error) {
            console.error('Error deleting blog:', error);
        }
    };

    if (!blog) return <Typography>Loading...</Typography>;

    const isAuthor = user && blog.user_id === user.id;

    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <Card>
                {blog.image_url && (
                    <CardMedia
                        component="img"
                        image={blog.image_url}
                        alt={blog.title}
                        height="400"
                    />
                )}
                <CardContent>
                    <Typography variant="h4" gutterBottom>
                        {blog.title}
                    </Typography>
                    <Typography variant="body1" paragraph>
                        {blog.content}
                    </Typography>
                    <Typography variant="subtitle2" color="text.secondary">
                        By {blog.author_name || 'Anonymous'} on{' '}
                        {format(new Date(blog.created_at), 'MMMM dd, yyyy')}
                    </Typography>

                    {/* Edit and Delete Options for Author */}
                    {isAuthor && (
                        <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => router.push(`/blog/create?id=${id}`)}
                            >
                                Edit
                            </Button>
                            <Button
                                variant="outlined"
                                color="error"
                                onClick={handleDeleteBlog}
                            >
                                Delete
                            </Button>
                        </Box>
                    )}

                    <Divider sx={{ my: 2 }} />

                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                        <Typography variant="body1" sx={{ mr: 2 }}>
                            Likes: {likes}
                        </Typography>
                        <Button variant="contained" onClick={handleLike}>
                            Like
                        </Button>
                    </Box>

                    <Typography variant="h5" gutterBottom>
                        Comments
                    </Typography>
                    <Box>
                        {comments.map((commentItem, index) => (
                            <Box key={index} sx={{ mt: 2 }}>
                                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                                    {commentItem.username || 'Anonymous'}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {commentItem.content}
                                </Typography>
                                <Divider sx={{ my: 1 }} />
                            </Box>
                        ))}

                        <TextField
                            fullWidth
                            label="Add a comment"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            multiline
                            rows={2}
                            variant="outlined"
                            sx={{ mt: 2 }}
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
                </CardContent>
            </Card>
        </Container>
    );
}
