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
    IconButton, Grid, Card, CardMedia, CardContent,
} from "@mui/material";
import VerifiedIcon from "@mui/icons-material/Verified";
import PersonIcon from "@mui/icons-material/Person";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ProductCard from "../../../components/products/ProductCard";
import Image from "next/image";

const ProductPage = () => {
    const router = useRouter();
    const params = useParams(); // Get the product ID from the URL
    const { id } = params;
    const [product, setProduct] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [session, setSession] = useState(null);
    const [newComment, setNewComment] = useState("");
    const [newRating, setNewRating] = useState(0);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [otherVendors, setOtherVendors] = useState([]);

    // Fetch product data
    useEffect(() => {
        const fetchProductAndVendors = async () => {
            try {
                // Fetch the current product
                const res = await fetch(`/api/products/${id}`);
                if (!res.ok) {
                    console.error("Error fetching product:", res.statusText);
                    return;
                }
                const data = await res.json();
                setProduct(data);

                // Fetch other vendors offering the same product
                const normalizedName = data.normalized_name;
                const resVendors = await fetch(
                    `/api/products/normalised-name/${encodeURIComponent(normalizedName)}`
                );
                if (!resVendors.ok) {
                    console.error("Error fetching other vendors:", resVendors.statusText);
                    return;
                }
                const vendorsData = await resVendors.json();

                // Exclude the current product
                const filteredVendors = vendorsData.filter((item) => item.id !== data.id);
                setOtherVendors(filteredVendors);
            } catch (error) {
                console.error("Error fetching product and vendors:", error);
            }
        };

        if (id) {
            fetchProductAndVendors();
        }
    }, [id]);

    // Fetch reviews
    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const res = await fetch(`/api/reviews?product_id=${id}`);
                if (res.ok) {
                    const data = await res.json();
                    setReviews(data);
                } else {
                    console.error("Error fetching reviews:", res.statusText);
                }
            } catch (error) {
                console.error("Error fetching reviews:", error);
            }
        };

        if (id) {
            fetchReviews();
        }
    }, [id]);

    // Fetch related products
    useEffect(() => {
        const fetchRelatedProducts = async () => {
            try {
                const res = await fetch(`/api/products/related?product_id=${id}`);
                if (res.ok) {
                    const data = await res.json();
                    setRelatedProducts(data);
                } else {
                    console.error("Error fetching related products:", res.statusText);
                }
            } catch (error) {
                console.error("Error fetching related products:", error);
            }
        };

        if (id) {
            fetchRelatedProducts();
        }
    }, [id]);

    // Check user session
    useEffect(() => {
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
        checkSession();
    }, []);

    if (!product) {
        return <Typography>Loading...</Typography>;
    }

    const handleBuyNowClick = () => {
        if (product.product_link) {
            window.open(product.product_link, "_blank");
        } else {
            console.error("No product link available");
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
                // Refetch reviews after submitting
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
                // Refetch reviews after liking
                fetchReviews();
            } else {
                const errorData = await res.json();
                console.error("Error liking review:", errorData.error);
            }
        } catch (error) {
            console.error("Error liking review:", error);
        }
    };

    if (!product) {
        return <Typography>Loading...</Typography>;
    }

    const productImageUrl = product.image_url.startsWith("//")
        ? `https:${product.image_url}`
        : product.image_url;

    return (
        <Box sx={{ padding: "2rem" }}>
            {/* Product Details */}
            <Box
                sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    gap: "2rem",
                    marginBottom: "2rem",
                }}
            >
                {/* Product Image */}
                <Box
                    sx={{
                        flex: 1,
                        position: "relative",
                        width: "100%",
                        height: "400px",
                    }}
                >
                    <Image
                        src={productImageUrl}
                        alt={product.product_name || "Product Image"}
                        fill
                        style={{ objectFit: "contain" }}
                    />
                </Box>

                {/* Product Info */}
                <Box sx={{ flex: 1 }}>
                    <Typography variant="h4" fontWeight="bold" gutterBottom>
                        {product.product_name}
                    </Typography>
                    <Typography variant="h6" color="textSecondary" gutterBottom>
                        {product.brand}
                    </Typography>

                    <Box sx={{ display: "flex", alignItems: "center", marginBottom: "1rem" }}>
                        <Rating value={product.rating || 0} readOnly precision={0.5} />
                        <Typography variant="body2" sx={{ marginLeft: "0.5rem" }}>
                            ({product.rating_count || 0} reviews)
                        </Typography>
                    </Box>

                    <Box sx={{ marginBottom: "1rem" }}>
                        <Typography variant="h5" fontWeight="bold">
                            Rs. {parseFloat(product.sale_price).toFixed(2)}
                        </Typography>
                        {product.regular_price && (
                            <Typography
                                variant="body1"
                                sx={{ textDecoration: "line-through", color: "#FF6961" }}
                            >
                                Rs. {parseFloat(product.regular_price).toFixed(2)}
                            </Typography>
                        )}
                    </Box>

                    {product.authenticity && (
                        <Chip
                            icon={<VerifiedIcon sx={{ color: "#66bb6a" }} />}
                            label="100% Authentic"
                            sx={{
                                backgroundColor: "#66bb6a",
                                color: "white",
                                fontSize: "0.8rem",
                                padding: "0.1rem 0.3rem",
                                maxWidth: "12rem",
                                marginBottom: "1rem",
                            }}
                        />
                    )}

                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleBuyNowClick}
                        sx={{ padding: "0.7rem 2.6rem", fontWeight: "bold", marginBottom: "1rem" }}
                    >
                        Buy Now
                    </Button>
                </Box>
            </Box>
            {otherVendors.length > 0 && (
                <Box sx={{ marginBottom: "2rem" }}>
                    <Typography variant="h5" gutterBottom>
                        Available from other vendors:
                    </Typography>
                    <Grid container spacing={2}>
                        {otherVendors.map((vendorProduct) => (
                            <Grid item xs={12} sm={6} md={4} key={vendorProduct.id}>
                                <Card>
                                    {vendorProduct.image_url && (
                                        <CardMedia
                                            sx={{ position: "relative", height: "200px" }}
                                        >
                                            <Image
                                                src={
                                                    vendorProduct.image_url.startsWith("//")
                                                        ? `https:${vendorProduct.image_url}`
                                                        : vendorProduct.image_url
                                                }
                                                alt={vendorProduct.product_name}
                                                fill
                                                style={{ objectFit: "contain" }}
                                            />
                                        </CardMedia>
                                    )}
                                    <CardContent>
                                        <Typography variant="h6">
                                            {vendorProduct.vendor_name}
                                        </Typography>
                                        <Typography variant="body1">
                                            Price: Rs.{" "}
                                            {parseFloat(
                                                vendorProduct.sale_price || vendorProduct.regular_price || 0
                                            ).toFixed(2)}
                                        </Typography>
                                        <Button
                                            variant="outlined"
                                            onClick={() =>
                                                window.open(vendorProduct.product_link, "_blank")
                                            }
                                            sx={{ marginTop: "1rem" }}
                                        >
                                            Buy Now
                                        </Button>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            )}

            {/* Reviews Section */}
            <Box sx={{ marginBottom: "2rem" }}>
                <Typography variant="h5" gutterBottom>
                    Reviews
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

                {/* Reviews List */}
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
                                    <Typography
                                        variant="caption"
                                        sx={{ color: "black", fontSize: "1rem" }}
                                    >
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

            {/* Related Products Section*/}
            <Box>
                <Typography variant="h5" gutterBottom>
                    Related Products
                </Typography>
                <Box
                    sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "1rem",
                        justifyContent: "flex-start",
                    }}
                >
                    {relatedProducts.map((relatedProduct) => (
                        <Box key={relatedProduct.id} sx={{ width: "200px" }}>
                            <ProductCard product={relatedProduct} />
                        </Box>
                    ))}
                </Box>
            </Box>
        </Box>
    );
};

export default ProductPage;
