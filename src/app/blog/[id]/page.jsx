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
    Grid,
    Avatar,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PersonIcon from '@mui/icons-material/Person';
import { format } from 'date-fns';
import { useRouter, useParams } from 'next/navigation';
import { useTheme } from "../../../contexts/themeContext";

export default function BlogPostPage() {
    const { theme } = useTheme();
    const [blog, setBlog] = useState(null);
    const [otherBlogs, setOtherBlogs] = useState([]);
    const [likes, setLikes] = useState(0);
    const [liked, setLiked] = useState(false);
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

                // Fetch comments for the blog post
                const commentsResponse = await fetch(`/api/blog/${id}/comment`);
                if (!commentsResponse.ok) {
                    throw new Error(`HTTP error! status: ${commentsResponse.status}`);
                }
                const commentsData = await commentsResponse.json();
                setComments(commentsData);

                // Fetch other blogs to display in the "Other Blogs" section
                const otherBlogsResponse = await fetch('/api/blog');
                if (!otherBlogsResponse.ok) {
                    throw new Error(`HTTP error! status: ${otherBlogsResponse.status}`);
                }
                const otherBlogsData = await otherBlogsResponse.json();
                setOtherBlogs(otherBlogsData.filter((b) => b.id !== id).slice(0, 3)); // Show only 3 blogs
            } catch (error) {
                console.error('Error fetching blog data:', error);
                setError('Failed to load blog post. Please try again later.');
            }
        }
        if (id) fetchBlogData();
    }, [id]);

    // Handle like/unlike functionality
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
                setLiked(!liked); // Toggle the liked state
            } else {
                console.error('Failed to toggle like status');
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
                setComments([addedComment, ...comments]); // Add new comment to the beginning of comments array
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
                router.push('/blog'); // Redirect to blog list page after deletion
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
    const date = new Date(blog.created_at);
    const formattedDate = format(date, 'MMMM dd, yyyy');

    return (
        <Container maxWidth="lg" sx={{ mt: 15, mb: 10 }}>
            <Card sx={{ p: 3, boxShadow: 3, borderRadius: '24px', overflow: 'hidden', backgroundColor: theme.palette.mode === 'light' ? '#fff' : 'transparent' }}>
                {blog.image_url && (
                    <CardMedia
                        component="img"
                        image={blog.image_url}
                        alt={blog.title}
                        sx={{ borderRadius: '16px', mb: 2 }}
                    />
                )}
                <CardContent>
                    <Typography gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main', fontSize: "4rem" }}>
                        {blog.title}
                    </Typography>
                    <Typography color="text.secondary" sx={{ mb: 1, fontSize: "2.4rem", fontWeight: "400" }}>
                        By {blog.author_name || 'Anonymous'} on {formattedDate}
                    </Typography>
                    <Divider sx={{ my: 2 }} />

                    <Typography sx={{ fontSize: '1.8rem', lineHeight: 1.7, fontWeight: "300" }}>
                        {blog.content}
                    </Typography>

                    {isAuthor && (
                        <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
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

                    <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-end", gap: 1 }}>
                        <IconButton onClick={handleLikeToggle} color="error" sx={{fontSize: "2rem" }}>
                            {liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                        </IconButton>
                        <Typography sx={{fontSize: "2rem"}}>{likes}</Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'left', mb: 2, gap: 1, flexDirection: "column" }}>
                        <Typography sx={{fontSize: "2.4rem", fontWeight: '400'}}>Add a Comment!</Typography>
                        <TextField
                            fullWidth
                            label="Add a comment"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            multiline
                            rows={2}
                            variant="outlined"
                            sx={{ borderRadius: '8px' }}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleCommentSubmit}
                            sx={{ width: "10%" }}
                        >
                            Submit
                        </Button>
                    </Box>

                    <Typography variant="h5" gutterBottom sx={{ mt: 4, fontWeight: 'bold', fontSize: "2.4rem" }}>
                        Comments
                    </Typography>
                    <Box sx={{ maxHeight: '300px', overflowY: 'auto', mb: 2, pr: 1 }}>
                        {comments.map((commentItem, index) => {
                            const commentDate = new Date(commentItem.created_at);
                            return (
                                <Box key={index} sx={{ mt: 2, mb: 1, pb: 1 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <Avatar>
                                            <PersonIcon />
                                        </Avatar>
                                        <Box>
                                            <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '1.5rem' }}>
                                                {commentItem.username || 'Anonymous'}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary" sx={{ fontSize: '1rem' }}>
                                                {format(commentDate, 'MMMM dd, yyyy, h:mm a')}
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <Typography variant="body1" color="text.secondary" sx={{ mt: 1, fontSize: '1.4rem' }}>
                                        {commentItem.content}
                                    </Typography>
                                    <Divider sx={{ my: 1 }} />
                                </Box>
                            );
                        })}
                    </Box>
                </CardContent>
            </Card>

            {/* Other Blogs Section */}
            <Typography sx={{ mt: 6, mb: 3, fontWeight: 'bold', color: 'primary.main', fontSize: "2.4rem" }}>
                Other Blogs You Might Like
            </Typography>
            <Grid container spacing={3}>
                {otherBlogs.map((otherBlog, index) => (
                    <Grid item xs={12} sm={6} md={4} key={otherBlog.id}>
                        <Card
                            sx={{
                                borderRadius: '24px',
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between",
                                padding: "3rem",
                                backgroundColor: theme.palette.mode === 'light' ? '#fff' : 'transparent',
                                color: theme.palette.mode === "light" ? '#212121' : '#fff',
                                boxShadow: theme.palette.mode === 'light' ? "0px 4px 12px rgba(0, 0, 0, 0.1)" : "none",
                            }}
                        >
                            {otherBlog.image_url && (
                                <CardMedia
                                    component="img"
                                    image={otherBlog.image_url}
                                    alt={otherBlog.title}
                                    sx={{ height: 140, borderRadius: '8px' }}
                                />
                            )}
                            <CardContent>
                                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', fontSize: '1.5rem' }}>
                                    {otherBlog.title}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{
                                        display: '-webkit-box',
                                        WebkitBoxOrient: 'vertical',
                                        overflow: 'hidden',
                                        WebkitLineClamp: 3, // Limit to 3 lines
                                        fontSize: '1.2rem',
                                        mb: 2,
                                    }}
                                >
                                    {otherBlog.content}
                                </Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        onClick={() => router.push(`/blog/${otherBlog.id}`)}
                                    >
                                        Read More
                                    </Button>
                                    <Box sx={{ display: 'flex', alignItems: 'center', color: 'error.main' }}>
                                        <FavoriteIcon sx={{ fontSize: '1.5rem', mr: 0.5 }} />
                                        <Typography variant="body2" color="text.secondary" sx={{ fontSize: '1.2rem' }}>
                                            {otherBlog.likes || 0}
                                        </Typography>
                                    </Box>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}
