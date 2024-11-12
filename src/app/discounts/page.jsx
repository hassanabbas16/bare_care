// pages/discounts/page.jsx
"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import ProductCard from "../../components/products/ProductCard";
import { useRouter } from "next/navigation";
import discountBanner2 from "../../../public/discountBanner2.png";
import cerave from "../../../public/cerave.png";
import neutrogena from "../../../public/neutrogena.png";
import garnier from "../../../public/garnier.png";

const DiscountsPage = () => {
    const [allDiscountedProducts, setAllDiscountedProducts] = useState([]);
    const [exclusiveProducts, setExclusiveProducts] = useState([]);
    const [bundles, setBundles] = useState({});
    const router = useRouter();

    useEffect(() => {
        const fetchDiscountedProducts = async () => {
            try {
                const response = await fetch("/api/products");
                const data = await response.json();

                // Filter discounted products
                const discountedProducts = data.filter(
                    (product) => product.discount && product.discount !== ""
                );

                setAllDiscountedProducts(discountedProducts);

                // Initialize exclusive products
                setExclusiveProducts(getRandomProducts(discountedProducts, 5));

                // Get bundles for main categories
                const mainCategories = ["Cleansers", "Toners", "Serums", "Moisturizers", "Sunscreens"];
                const categoryBundles = {};
                mainCategories.forEach((category) => {
                    categoryBundles[category] = discountedProducts.filter(
                        (product) => product.category === category
                    );
                });
                setBundles(categoryBundles);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchDiscountedProducts();
    }, []);

    const getRandomProducts = (productsArray, count) => {
        const shuffled = [...productsArray].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    };

    return (
        <Box>
            {/* Hero Banner */}
            <Box
                sx={{
                    height: "100vh",
                    backgroundImage: `url(${discountBanner2.src})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                    textAlign: "center",
                }}
            >
            </Box>

            {/* Featured Products Section */}
            <Box sx={{ mt: 4, mb: 4, textAlign: "center" }}>
                <Typography variant="h1" sx={{ fontSize: "4rem", fontWeight: "bold", mb: 4, textAlign: "center" }}>
                    Featured Discounts
                </Typography>
                <Grid container spacing={4} justifyContent="center">
                    {[{ img: cerave, label: "Up to 40% OFF", name: "Cerave" },
                        { img: neutrogena, label: "Up to 20% OFF", name: "Neutrogena" },
                        { img: garnier, label: "Up to 50% OFF", name: "Garnier" },]
                        .map((product, index) => (
                            <Grid item xs={12} sm={6} md={3} key={index}>
                                <Box
                                    sx={{
                                        width: "300px",
                                        height: "300px",
                                        border: "1px solid #ddd",
                                        borderRadius: "8px",
                                        overflow: "hidden",
                                        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        transition: "transform 0.3s ease",
                                        "&:hover": {
                                            transform: "scale(1.05)",
                                            boxShadow: "0 8px 16px rgba(0,0,0,0.2)"
                                        }
                                    }}
                                >
                                    <img
                                        src={product.img.src}
                                        alt={product.name}
                                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                    />
                                </Box>
                                <Typography variant="h6" sx={{ mt: 1, fontWeight: "bold", color: "#d32f2f" }}>
                                    {product.label}
                                </Typography>
                                <Typography variant="subtitle1" sx={{ color: "#333" }}>
                                    {product.name}
                                </Typography>
                            </Grid>
                        ))}
                </Grid>
            </Box>

            {/* Exclusive Products Section */}
            <Box sx={{ padding: "2rem" }}>
                <Typography variant="h4" sx={{ fontSize: "4rem", marginBottom: "2rem", textAlign: "center", fontWeight: "bold" }}>
                    Exclusive Offers
                </Typography>
                <Grid container spacing={2} justifyContent="center">
                    {exclusiveProducts.map((product) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                            <ProductCard product={product} />
                        </Grid>
                    ))}
                </Grid>
            </Box>

            {/* Bundles Section */}
            {Object.keys(bundles).map((category) => (
                <Box key={category} sx={{ padding: "2rem", textAlign: "center" }}>
                    <Typography variant="h4" sx={{ fontSize: "4rem", marginBottom: "2rem", fontWeight: "bold" }}>
                        {category} Deals
                    </Typography>
                    <Grid container spacing={2} justifyContent="center">
                        {bundles[category].slice(0, 5).map((product) => (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                                <ProductCard product={product} />
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            ))}
        </Box>
    );
};

export default dynamic(() => Promise.resolve(DiscountsPage), {
    ssr: false,
});
