// pages/products/[id].jsx
"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import {
    Box,
    Typography,
    Button,
    Chip,
    Rating,
    Avatar,
    TextField,
    Grid,
    Card,
    CardContent,
    CardMedia,
} from "@mui/material";
import VerifiedIcon from "@mui/icons-material/Verified";
import PersonIcon from "@mui/icons-material/Person";
import { useTheme } from "../../../contexts/themeContext";
import ProductCard from "../../../components/products/ProductCard";
import Image from "next/image";
import FloatingCircle from '../../../components/common/FloatingCircle';

const ProductPage = () => {
    const { theme } = useTheme();
    const router = useRouter();
    const params = useParams();
    const { id } = params;
    const [product, setProduct] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [session, setSession] = useState(null);
    const [newComment, setNewComment] = useState("");
    const [newRating, setNewRating] = useState(0);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [otherVendors, setOtherVendors] = useState([]);

    // Fetch product and vendors
    useEffect(() => {
        const fetchProductAndVendors = async () => {
            try {
                const res = await fetch(`/api/products/${id}`);
                if (!res.ok) return;
                const data = await res.json();
                setProduct(data);

                const normalizedName = data.normalized_name;
                const resVendors = await fetch(
                    `/api/products/normalised-name/${encodeURIComponent(normalizedName)}`
                );
                if (!resVendors.ok) return;
                const vendorsData = await resVendors.json();
                const filteredVendors = vendorsData.filter((item) => item.id !== data.id);
                setOtherVendors(filteredVendors);
            } catch (error) {
                console.error("Error fetching product and vendors:", error);
            }
        };

        if (id) fetchProductAndVendors();
    }, [id]);

    // Define fetchReviews as a standalone function so it can be reused
    const fetchReviews = async () => {
        try {
            const res = await fetch(`/api/reviews?product_id=${id}`);
            if (res.ok) {
                const data = await res.json();
                setReviews(data);
            }
        } catch (error) {
            console.error("Error fetching reviews:", error);
        }
    };

    // Fetch reviews on component mount
    useEffect(() => {
        if (id) fetchReviews();
    }, [id]);

    // Fetch related products
    useEffect(() => {
        const fetchRelatedProducts = async () => {
            try {
                const res = await fetch(`/api/products/related?product_id=${id}`);
                if (res.ok) {
                    const data = await res.json();
                    setRelatedProducts(data);
                }
            } catch (error) {
                console.error("Error fetching related products:", error);
            }
        };

        if (id) fetchRelatedProducts();
    }, [id]);

    // Check user session
    useEffect(() => {
        const checkSession = async () => {
            try {
                const res = await fetch("/api/auth/session");
                const data = await res.json();
                if (data.user) setSession(data.user);
            } catch (error) {
                console.error("Error checking session:", error);
            }
        };
        checkSession();
    }, []);

    if (!product) return <Typography>Loading...</Typography>;

    const handleBuyNowClick = () => {
        if (product.product_link) {
            window.open(product.product_link, "_blank");
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

            const redirectUrl = `/products/${product.id}`;
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
                fetchReviews(); // Refetch reviews after submitting
            } else {
                const errorData = await res.json();
                console.error("Error submitting review:", errorData.error);
            }
        } catch (error) {
            console.error("Error submitting review:", error);
        }
    };

    const productImageUrl = product.image_url.startsWith("//")
        ? `https:${product.image_url}`
        : product.image_url;

    return (
        <Box sx={{ paddingTop: "15rem", alignItems: "center", justifyContent: "center", paddingBottom: "10rem", display: "flex", flexDirection: "column" }}>
            <FloatingCircle size="400px" top="10%" left="0%" dark />
            <FloatingCircle size="500px" top="40%" right="0" />
            <FloatingCircle size="600px" bottom="-50%" left="-10%" />
            <Card
                sx={{
                    minHeight: '300px',
                    maxWidth: "80%",
                    minWidth: "80%",
                    borderRadius: "24px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    padding: "3rem",
                    zIndex: 1,
                    backgroundColor: theme.palette.mode === 'light' ? '#fff' : 'transparent',
                    color: theme.palette.mode === "light" ? '#212121' : '#fff',
                    boxShadow: theme.palette.mode === 'light' ? "0px 4px 12px rgba(0, 0, 0, 0.1)" : "none",
                    marginBottom: "8rem",
                }}
            >
                <Typography fontWeight="bold" gutterBottom sx={{fontSize: "3.6rem"}}>
                    {product.product_name}
                </Typography>

                <Grid container spacing={3}>
                    <Grid item xs={12} md={5}>
                        <Box sx={{ position: "relative", width: "100%", height: "400px" }}>
                            <Image
                                src={productImageUrl}
                                alt={product.product_name || "Product Image"}
                                fill
                                style={{ objectFit: "contain", borderRadius: "8px" }}
                            />
                        </Box>
                    </Grid>

                    <Grid item xs={12} md={7}>
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                            <Typography color="textSecondary" sx={{fontSize: "1.6rem"}}>
                                Brand: {product.brand}
                            </Typography>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                <Rating value={product.rating || 0} readOnly precision={0.5} />
                                <Typography sx={{fontSize: "1.2rem"}}>
                                    ({product.rating_count || 0} reviews)
                                </Typography>
                            </Box>
                            <Typography fontWeight="bold" color="primary" sx={{fontSize: "1.6rem"}}>
                                Rs. {parseFloat(product.sale_price).toFixed(2)}
                            </Typography>
                            {product.regular_price && (
                                <Typography
                                    sx={{
                                        textDecoration: "line-through",
                                        color: "#FF6961",
                                        fontSize: "1.4rem",
                                    }}
                                >
                                    Rs. {parseFloat(product.regular_price).toFixed(2)}
                                </Typography>
                            )}
                            {product.authenticity && (
                                <Chip
                                    icon={<VerifiedIcon sx={{ color: "#66bb6a" }} />}
                                    label="100% Authentic"
                                    sx={{
                                        backgroundColor: "#66bb6a",
                                        color: "white",
                                        fontSize: "0.8rem",
                                        padding: "0.1rem 0.3rem",
                                    }}
                                />
                            )}
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleBuyNowClick}
                                sx={{ fontWeight: "bold", marginTop: "1rem" }}
                            >
                                Buy Now
                            </Button>
                        </Box>
                    </Grid>
                </Grid>

                <Typography gutterBottom sx={{fontSize: "2.8rem", mt: 3}}>
                    Reviews
                </Typography>

                <Box sx={{ marginBottom: "2rem" }}>
                    <Typography mb={1} sx={{fontSize: "2rem"}}>
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
                        sx={{fontSize: "1.6rem"}}
                    >
                        Submit Review
                    </Button>
                </Box>

                <Box
                    sx={{
                        maxHeight: "500px",
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
                                <Typography variant="body2">
                                    {review.comment}
                                </Typography>
                                <Typography
                                    variant="caption"
                                    sx={{ color: theme.palette.mode === 'light' ? 'grey' : 'white', display: "block", mt: 1 }}
                                >
                                    {new Date(review.created_at).toLocaleDateString()}
                                </Typography>
                            </Box>
                        ))
                    ) : (
                        <Typography variant="body2">
                            No reviews yet.
                        </Typography>
                    )}
                </Box>
            </Card>

            <Card sx={{
                minHeight: '300px',
                maxWidth: "80%",
                zIndex: 1,
                minWidth: "80%",
                borderRadius: "24px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                padding: "3rem",
                backgroundColor: theme.palette.mode === 'light' ? '#fff' : 'transparent',
                color: theme.palette.mode === "light" ? '#212121' : '#fff',
                boxShadow: theme.palette.mode === 'light' ? "0px 4px 12px rgba(0, 0, 0, 0.1)" : "none",
                marginBottom: "8rem",
            }}>
                <Typography gutterBottom sx={{fontSize: "2.8rem", mb: 3}}>
                    Related Products
                </Typography>
                <Box
                    sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "1rem",
                        justifyContent: "center",
                    }}
                >
                    {relatedProducts.map((relatedProduct) => (
                        <Box key={relatedProduct.id}>
                            <ProductCard product={relatedProduct} />
                        </Box>
                    ))}
                </Box>
            </Card>
        </Box>
    );
};

export default ProductPage;
