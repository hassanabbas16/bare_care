import React, { useState } from "react";
import {
    Card,
    CardMedia,
    CardContent,
    Typography,
    Box,
    IconButton,
    Button,
    Chip,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import VerifiedIcon from "@mui/icons-material/Verified";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import Image from "next/image";

const ProductCard = ({ product }) => {
    const [wishlist, setWishlist] = useState(false);
    const [openReviewModal, setOpenReviewModal] = useState(false); // State for review modal

    const handleWishlistToggle = () => {
        setWishlist(!wishlist);
    };

    const handleBuyNowClick = () => {
        if (product.product_link) {
            window.open(product.product_link, '_blank');
        } else {
            console.error('No product link available');
        }
    };

    const handleOpenReviewModal = () => {
        setOpenReviewModal(true); // Open modal
    };

    const handleCloseReviewModal = () => {
        setOpenReviewModal(false); // Close modal
    };

    const salePrice = product.sale_price ? parseFloat(product.sale_price) : null;
    const regularPrice = product.regular_price ? parseFloat(product.regular_price) : null;

    const displayPrice = salePrice !== null ? salePrice.toFixed(2) : 'No price available';
    const displayRegularPrice = regularPrice !== null && regularPrice !== salePrice ? regularPrice.toFixed(2) : null;

    const productImageUrl = product.image_url.startsWith("//")
        ? `https:${product.image_url}`
        : product.image_url;

    // Function to render star rating
    const renderStarRating = (rating) => {
        const maxStars = 5;
        return (
            <Box sx={{ display: 'flex' }}>
                {[...Array(maxStars)].map((_, index) => (
                    <IconButton key={index} sx={{ padding: 0, color: index < rating ? '#FFD700' : '#e0e0e0' }}>
                        {index < rating ? <StarIcon /> : <StarBorderIcon />}
                    </IconButton>
                ))}
            </Box>
        );
    };

    return (
        <>
            <Card
                sx={{
                    borderRadius: "20px",
                    boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.1)",
                    overflow: "hidden",
                    position: "relative",
                    transition: "transform 0.3s ease-in-out",
                    "&:hover": { transform: "translateY(-5px)" },
                    width: "100%",
                    maxWidth: "250px",
                    margin: "auto",
                    backgroundColor: "white",
                }}
            >
                <IconButton
                    onClick={handleWishlistToggle}
                    sx={{
                        position: "absolute",
                        top: "15px",
                        right: "15px",
                        zIndex: 10,
                        color: wishlist ? "red" : "#000",
                        border: !wishlist ? "0.5px solid black" : "none",
                        backgroundColor: "rgba(255, 255, 255, 0.7)",
                        "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.9)" },
                    }}
                >
                    {wishlist ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                </IconButton>

                <Box
                    sx={{
                        position: "relative",
                        height: 200,
                        width: "100%",
                        "&::after": {
                            content: '""',
                            position: "absolute",
                            bottom: 0,
                            left: 0,
                            width: "100%",
                            height: "100px",
                            backgroundImage:
                                "linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1))",
                            zIndex: 1,
                        },
                    }}
                >
                    <CardMedia component="div" sx={{ height: 200, position: "relative" }}>
                        <Image
                            src={productImageUrl}
                            alt={product.product_name || 'Product Image'}
                            layout="fill"
                            objectFit="contain"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    </CardMedia>
                </Box>

                <CardContent
                    sx={{
                        backgroundColor: "#fff",
                        padding: "1.5rem",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                    }}
                >
                    <Box sx={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
                        <Typography
                            variant="h6"
                            fontWeight="bold"
                            color="black"
                            sx={{
                                maxHeight: "48px",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                display: "-webkit-box",
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: "vertical",
                                width: "70%",
                            }}
                        >
                            {product.product_name || 'No product name available'}
                        </Typography>

                        <Typography
                            variant="body2"
                            color="black"
                            sx={{ width: "30%", textAlign: "right", whiteSpace: "nowrap" }}
                        >
                            {product.brand || 'No brand'}
                        </Typography>
                    </Box>

                    <Box sx={{ marginBottom: "1rem" }}>
                        {renderStarRating(product.rating || 0)}
                    </Box>

                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Box>
                            <Typography variant="h6" fontWeight="bold" color="black">
                                Rs. {displayPrice}
                            </Typography>
                            {displayRegularPrice && (
                                <Typography
                                    variant="body2"
                                    sx={{ textDecoration: "line-through", color: "#FF6961" }}
                                >
                                    Rs. {displayRegularPrice}
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
                                }}
                            />
                        )}
                    </Box>

                    <Box
                        sx={{
                            display: "flex",
                            gap: "1rem",
                            justifyContent: "center",
                            mt: 2,
                            flexDirection: {
                                xs: "column",
                                sm: "row",
                            },
                        }}
                    >
                        <Button
                            variant="contained"
                            color="primary"
                            sx={{ padding: "0.7rem 2.6rem", fontWeight: "bold", width: "100%" }}
                            onClick={handleBuyNowClick}
                        >
                            Buy Now
                        </Button>
                        <Button
                            variant="outlined"
                            color="primary"
                            sx={{ padding: "0.7rem 2.6rem", fontWeight: "bold", width: "100%" }}
                            onClick={handleOpenReviewModal} // Open modal on click
                        >
                            Reviews
                        </Button>
                    </Box>
                </CardContent>
            </Card>

            <Dialog open={openReviewModal} onClose={handleCloseReviewModal}>
                <DialogTitle>Reviews</DialogTitle>
                <DialogContent>
                    Reviews are coming soon! {/* Placeholder message */}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseReviewModal}>Close</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default ProductCard;
