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
    IconButton,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { format } from 'date-fns';
import { useRouter, useParams } from 'next/navigation';

export default function BlogPostPage() {
    const [blog, setBlog] = useState(null);
    const [likes, setLikes] = useState(0);
    const [liked, setLiked] = useState(false); // Track if the post is liked
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const router = useRouter();
    const params = useParams();
    const { id } = params;

    // Fetch blog data and comments
    useEffect(() => {
        async function fetchBlogData() {
            try {
                const response = await fetch(`/api/blog/${id}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setBlog(data);
                setLikes(data.likes || 0);

                // Fetch comments
                const commentsResponse = await fetch(`/api/blog/${id}/comment`);
                if (!commentsResponse.ok) {
                    throw new Error(`HTTP error! status: ${commentsResponse.status}`);
                }
                const commentsData = await commentsResponse.json();
                setComments(commentsData);
            } catch (error) {
                console.error('Error fetching blog data:', error);
                setError('Failed to load blog post. Please try again later.');
            }
        }
        if (id) fetchBlogData();
    }, [id]);

    // Fetch user session using /api/auth/session
    useEffect(() => {
        async function fetchSession() {
            try {
                const response = await fetch('/api/auth/session');
                const sessionData = await response.json();
                if (sessionData.loggedIn) {
                    setUser(sessionData.user);
                }
            } catch (error) {
                console.error('Error fetching session:', error);
            }
        }
        fetchSession();
    }, []);

    // Initialize liked state
    useEffect(() => {
        if (blog) {
            if (user) {
                // For logged-in users, check if they have liked the post
                async function fetchLikedStatus() {
                    try {
                        const response = await fetch(`/api/blog/${id}/liked`, {
                            method: 'GET',
                            headers: { 'Content-Type': 'application/json' },
                        });
                        if (response.ok) {
                            const data = await response.json();
                            setLiked(data.liked);
                        } else {
                            console.error('Failed to fetch liked status');
                        }
                    } catch (error) {
                        console.error('Error fetching liked status:', error);
                    }
                }
                fetchLikedStatus();
            } else {
                // For anonymous users, check local storage
                const likedPosts = JSON.parse(localStorage.getItem('likedPosts') || '[]');
                setLiked(likedPosts.includes(id));
            }
        }
    }, [blog, user, id]);

    // Handle like toggle
    const handleLikeToggle = async () => {
        try {
            const action = liked ? 'unlike' : 'like';
            const response = await fetch(`/api/blog/${id}/likes`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action }),
            });

            if (response.ok) {
                const { likes: updatedLikes } = await response.json();
                setLikes(updatedLikes);
                setLiked(!liked); // Toggle liked state

                // Update local storage for anonymous users
                if (!user) {
                    const likedPosts = JSON.parse(localStorage.getItem('likedPosts') || '[]');
                    if (action === 'like') {
                        localStorage.setItem('likedPosts', JSON.stringify([...likedPosts, id]));
                    } else {
                        localStorage.setItem('likedPosts', JSON.stringify(likedPosts.filter(postId => postId !== id)));
                    }
                }
            } else {
                console.error('Failed to like/unlike the post');
            }
        } catch (error) {
            console.error('Error toggling like:', error);
        }
    };

    // Handle comment submission
    const handleCommentSubmit = async () => {
        if (!comment.trim()) return;
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

    // Handle blog deletion
    const handleDeleteBlog = async () => {
        try {
            const response = await fetch(`/api/blog/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
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

    if (error) {
        return (
            <Container maxWidth="md" sx={{ mt: 4 }}>
                <Typography color="error">{error}</Typography>
            </Container>
        );
    }

    if (!blog) return <Typography>Loading...</Typography>;

    const isAuthor = user && blog.user_id === user.id;

    // Validate and format the date
    function isValidDate(d) {
        return d instanceof Date && !isNaN(d);
    }

    const date = new Date(blog.created_at);
    const formattedDate = isValidDate(date) ? format(date, 'MMMM dd, yyyy') : 'Unknown date';

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
                        By {blog.author_name || 'Anonymous'} on {formattedDate}
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
                        <IconButton onClick={handleLikeToggle} color="error">
                            {liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                        </IconButton>
                        <Typography variant="body1" sx={{ ml: 1 }}>
                            {likes}
                        </Typography>
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
