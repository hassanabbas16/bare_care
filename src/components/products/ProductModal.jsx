// components/products/ProductModal.jsx
"use client";
import React, { useState, useEffect } from "react";
import {
    Box,
    Typography,
    Modal,
    IconButton,
    TextField,
    Avatar,
    Rating,
    Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import PersonIcon from "@mui/icons-material/Person";
import { useRouter } from "next/navigation";
import ProductCard from "./ProductCard";

const ProductModal = ({ open, onClose, product }) => {
    const [reviews, setReviews] = useState([]);
    const [session, setSession] = useState(null);
    const [newComment, setNewComment] = useState("");
    const [newRating, setNewRating] = useState(0);
    const router = useRouter();

    useEffect(() => {
        if (open) {
            fetchReviews();
            checkSession();

            const pendingReview = localStorage.getItem("pendingReview");
            if (pendingReview) {
                const { productId, comment, rating } = JSON.parse(pendingReview);
                if (productId === product.id) {
                    setNewComment(comment);
                    setNewRating(rating);
                    localStorage.removeItem("pendingReview");
                }
            }
        }
    }, [open]);

    const fetchReviews = async () => {
        try {
            const res = await fetch(`/api/reviews?product_id=${product.id}`);
            const data = await res.json();
            setReviews(data);
        } catch (error) {
            console.error("Error fetching reviews:", error);
        }
    };

    const checkSession = async () => {
        try {
            const res = await fetch("/api/auth/session");
            const data = await res.json();
            if (data.user) {
                setSession(data.user);
            } else {
                setSession(null);
            }
        } catch (error) {
            console.error("Error checking session:", error);
        }
    };

    const handleSubmitReview = async () => {
        if (!session) {
            localStorage.setItem(
                "pendingReview",
                JSON.stringify({
                    productId: product.id,
                    comment: newComment,
                    rating: newRating,
                })
            );

            const params = new URLSearchParams(window.location.search);
            params.set("product", product.id);

            const redirectUrl = `/products?${params.toString()}`;
            router.push(`/login?redirect=${encodeURIComponent(redirectUrl)}`);
            return;
        }

        try {
            const res = await fetch("/api/reviews", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    product_id: product.id,
                    rating: newRating,
                    comment: newComment,
                }),
            });
            if (res.ok) {
                setNewComment("");
                setNewRating(0);
                fetchReviews();
            } else {
                const errorData = await res.json();
                console.error("Error submitting review:", errorData.error);
            }
        } catch (error) {
            console.error("Error submitting review:", error);
        }
    };

    const handleLike = async (review_id) => {
        try {
            const res = await fetch("/api/reviews/like", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ review_id }),
            });
            if (res.ok) {
                fetchReviews();
            } else {
                const errorData = await res.json();
                console.error("Error liking review:", errorData.error);
            }
        } catch (error) {
            console.error("Error liking review:", error);
        }
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                outline: "none",
            }}
        >
            <Box
                sx={{
                    width: "80%",
                    maxWidth: "900px",
                    backgroundColor: "white",
                    borderRadius: "10px",
                    padding: "2rem",
                    boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.1)",
                    position: "relative",
                    maxHeight: "80vh",
                    overflowY: "auto",
                }}
            >
                <IconButton
                    sx={{
                        position: "absolute",
                        top: "10px",
                        right: "10px",
                        zIndex: 100,
                    }}
                    onClick={onClose}
                >
                    <CloseIcon />
                </IconButton>

                <Box
                    sx={{
                        display: "flex",
                        flexDirection: { xs: "column", md: "row" },
                        gap: "2rem",
                    }}
                >
                    <Box sx={{ flex: 1, display: "flex", alignItems: "center" }}>
                        <ProductCard product={product} hideReviewsButton={true} />
                    </Box>

                    <Box sx={{ flex: 2 }}>
                        <Typography variant="h5" mb={3} color="black">
                            Reviews for {product.product_name}
                        </Typography>

                        <Box mb={2}>
                            <Typography variant="h6" color="black" mb={1}>
                                Write a Review
                            </Typography>
                            <Rating
                                name="new-rating"
                                value={newRating}
                                onChange={(event, newValue) => setNewRating(newValue)}
                            />
                            <TextField
                                fullWidth
                                label="Your review"
                                multiline
                                minRows={3}
                                variant="outlined"
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                sx={{ mt: 2, mb: 2 }}
                            />
                            <Button
                                variant="contained"
                                onClick={handleSubmitReview}
                                disabled={!newComment || newRating === 0}
                            >
                                Submit Review
                            </Button>
                        </Box>

                        {/* Scrollable Reviews List */}
                        <Box
                            sx={{
                                maxHeight: "300px",
                                overflowY: "auto",
                                borderTop: "1px solid #ccc",
                                paddingTop: "1rem",
                            }}
                        >
                            {reviews.length > 0 ? (
                                reviews.map((review) => (
                                    <Box
                                        key={review.id}
                                        mb={2}
                                        borderBottom="1px solid #ccc"
                                        pb={2}
                                    >
                                        <Box display="flex" alignItems="center" mb={1}>
                                            <Avatar sx={{ bgcolor: "#1976d2", mr: 2 }}>
                                                <PersonIcon />
                                            </Avatar>
                                            <Box>
                                                <Typography
                                                    variant="h6"
                                                    fontWeight="bold"
                                                    color="black"
                                                >
                                                    {review.profiles
                                                        ? `${review.profiles.first_name} ${review.profiles.last_name}`
                                                        : "Anonymous"}
                                                </Typography>
                                                <Rating
                                                    value={review.rating}
                                                    readOnly
                                                    precision={0.5}
                                                />
                                            </Box>
                                        </Box>
                                        <Typography variant="body2" color="black">
                                            {review.comment}
                                        </Typography>
                                        <Typography
                                            variant="caption"
                                            sx={{ color: "gray", display: "block", mt: 1 }}
                                        >
                                            {new Date(review.created_at).toLocaleDateString()}
                                        </Typography>
                                        <Box display="flex" alignItems="center" mt={1}>
                                            <IconButton
                                                size="small"
                                                sx={{ color: "#1976d2" }}
                                                onClick={() => handleLike(review.id)}
                                            >
                                                <ThumbUpIcon fontSize="small" />
                                            </IconButton>
                                            <Typography variant="caption" sx={{ color: "black", fontSize: "1rem" }}>
                                                {review.likes || 0} Likes
                                            </Typography>
                                        </Box>
                                    </Box>
                                ))
                            ) : (
                                <Typography variant="body2" color="black">
                                    No reviews yet.
                                </Typography>
                            )}
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Modal>
    );
};

export default ProductModal;
