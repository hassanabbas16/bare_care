// pages/discounts/page.jsx
"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import ProductCard from "../../components/products/ProductCard";
import ExpandingCards from "../../components/discount/ExpandableCards";
import { useRouter } from "next/navigation";
import heroBg2 from "../../../public/Home/herobg2.png";

const DiscountsPage = () => {
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

                // Initialize exclusive products
                setExclusiveProducts(getRandomProducts(discountedProducts, 5));

                // Get bundles for main categories
                const mainCategories = ["Cleansers", "Toners", "Serums", "Moisturizers", "Sunscreens"]; // Replace with your actual categories
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
                    height: "60vh",
                    backgroundImage: `url(${heroBg2})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                    textAlign: "center",
                }}
            >
                <Typography variant="h2" sx={{ fontWeight: "bold", textShadow: "2px 2px 8px rgba(0,0,0,0.7)" }}>
                    Exclusive Discounts on Skincare Essentials!
                </Typography>
            </Box>

            {/* Exclusive Products Section */}
            <Box sx={{ padding: "2rem" }}>
                <Typography variant="h4" sx={{ marginBottom: "2rem", textAlign: "center", fontWeight: "bold" }}>
                    Exclusive Offers
                </Typography>
                <Grid container spacing={2}>
                    {exclusiveProducts.map((product) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                            <ProductCard product={product} />
                        </Grid>
                    ))}
                </Grid>
            </Box>

            {/* Banner or Special Component */}
            <ExpandingCards />

            {/* Bundles Section */}
            {Object.keys(bundles).map((category) => (
                <Box key={category} sx={{ padding: "2rem" }}>
                    <Typography variant="h4" sx={{ marginBottom: "2rem", fontWeight: "bold" }}>
                        {category} Deals
                    </Typography>
                    <Grid container spacing={2}>
                        {bundles[category].slice(0, 5).map((product) => (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                                <ProductCard product={product} />
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            ))}

            {/* Additional Banners or Components if needed */}
            {/* ... */}
        </Box>
    );
};

export default dynamic(() => Promise.resolve(DiscountsPage), {
    ssr: false,
});
