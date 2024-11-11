// pages/discounts/page.jsx
"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Box, Typography, Grid, Card, CardContent, CardMedia } from "@mui/material";
import ProductCard from "../../components/products/ProductCard";
import ExpandingCards from "../../components/discount/ExpandableCards";
import { useRouter } from "next/navigation";
import heroBg2 from "../../../public/Home/herobg2.png";
import { useTheme } from "../../contexts/themeContext";

const DiscountsPage = () => {
    const { theme } = useTheme();
    const [allDiscountedProducts, setAllDiscountedProducts] = useState([]);
    const [exclusiveProducts, setExclusiveProducts] = useState([]);
    const [bundles, setBundles] = useState({});
    const [timer, setTimer] = useState(0);
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
                setExclusiveProducts(getRandomProducts(discountedProducts, 5));

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

    // Update exclusive products every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setExclusiveProducts(getRandomProducts(allDiscountedProducts, 5));
            setTimer((prev) => prev + 1);
        }, 5000);

        return () => clearInterval(interval);
    }, [allDiscountedProducts]);

    const getRandomProducts = (productsArray, count) => {
        const shuffled = [...productsArray].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    };

    return (
        <Box>
            {/* Hero Section */}
            <Box
                sx={{
                    height: "70vh",
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${heroBg2})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                    textAlign: "center",
                    padding: "0 2rem",
                    boxShadow: theme.palette.mode === "light" ? "0px 10px 20px rgba(0, 0, 0, 0.2)" : "0px 10px 20px rgba(255, 255, 255, 0.1)",
                }}
            >
                <Typography variant="h2" sx={{ fontWeight: "bold", textShadow: "3px 3px 12px rgba(0,0,0,0.7)", fontSize: { xs: "2.4rem", md: "4rem" } }}>
                    Exclusive Discounts on Skincare Essentials!
                </Typography>
            </Box>

            {/* Exclusive Products Section */}
            <Box sx={{ padding: "4rem 2rem", backgroundColor: theme.palette.mode === "light" ? "#f7f9fc" : "#121212" }}>
                <Typography variant="h4" sx={{ marginBottom: "3rem", textAlign: "center", fontWeight: "bold", fontSize: "2.8rem", color: theme.palette.mode === "light" ? "#333" : "#fff" }}>
                    Exclusive Offers
                </Typography>
                <Grid container spacing={4}>
                    {exclusiveProducts.map((product) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                            <ProductCard product={product} />
                        </Grid>
                    ))}
                </Grid>
            </Box>

            {/* Special Banner Section */}
            <Box sx={{ padding: "3rem 0", background: "linear-gradient(45deg, #ff9a9e, #fad0c4)", margin: "4rem 0" }}>
                <ExpandingCards />
            </Box>

            {/* Bundles Section */}
            {Object.keys(bundles).map((category) => (
                <Box key={category} sx={{ padding: "4rem 2rem", backgroundColor: theme.palette.mode === "light" ? "#f2f4f8" : "#1c1c1c" }}>
                    <Typography variant="h4" sx={{ marginBottom: "3rem", fontWeight: "bold", fontSize: "2.8rem", color: theme.palette.mode === "light" ? "#333" : "#fff" }}>
                        {category} Deals
                    </Typography>
                    <Grid container spacing={4}>
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
