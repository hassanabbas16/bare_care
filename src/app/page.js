"use client";
import { useTheme } from "../contexts/themeContext";
import Footer from "../components/footer/Footer";
import Navbar from "../components/navbar/Navbar";
import HeroSection from "../components/Home/Hero/heroSection2";
import PollModal from "../components/Home/Polls/PollModal";
import RelatedSection from "../components/products/RelatedSection";
import CategorySection from "../components/Home/Products/CategorySection";
import React, { useState, useEffect } from "react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import Grid from "@mui/material/Grid2";
import ProductCard from "@/components/products/ProductCard";
import CallToActionBox from "../components/common/CallToActionBox";
import HowItWorks from "../components/Home/about/HowItWorks";
import FloatingCircle from "@/components/common/FloatingCircle";

export default function Home() {
    const { theme } = useTheme();
    const [exclusiveProducts, setExclusiveProducts] = useState([]);

    // Media query to check if screen width is 1368px or below
    const isScreen1368 = useMediaQuery('(max-width: 1368px)');

    useEffect(() => {
        const fetchExclusiveProducts = async () => {
            try {
                const response = await fetch("/api/products");
                const data = await response.json();

                const discountedProducts = data.filter(
                    (product) => product.discount && product.discount.toLowerCase() !== "no discount"
                );

                const selectedExclusiveProducts = getRandomProducts(discountedProducts, 5);
                setExclusiveProducts(selectedExclusiveProducts);
            } catch (error) {
                console.error("Error fetching exclusive products:", error);
            }
        };

        fetchExclusiveProducts();
    }, []);

    const getRandomProducts = (productsArray, count) => {
        const shuffled = [...productsArray].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    };

    const topBrands = [
        "CeraVe",
        "DIOR",
        "The Ordinary",
        "Neutrogena",
        "Clinique",
        "Garnier",
        "COSRX",
        "The Inkey List",
        "La Roche Posay",
        "Derma Shine",
    ];

    // Display only 4 products if screen width is 1368px or below
    const displayedExclusiveProducts = isScreen1368
        ? exclusiveProducts.slice(0, 4)
        : exclusiveProducts;

    return (
        <div
            style={{
                backgroundColor: theme.palette.background.default,
                color: theme.palette.primary.contrastText,
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
            }}
        >
            <FloatingCircle size="400px" top="150%" left="10%" dark />
            <FloatingCircle size="500px" top="220%" right="5%" />
            <FloatingCircle size="600px" bottom="-250%" left="-10%" />
            <FloatingCircle size="400px" top="400%" left="10%" dark />
            <FloatingCircle size="500px" top="90%" right="5%" />
            <FloatingCircle size="600px" bottom="-380%" right="-10%" />
            <Navbar />
            <HeroSection />
            <CategorySection />
            <RelatedSection type="brand" brands={topBrands} />
            <Box sx={{ padding: "2rem" }}>
                <Typography variant="h4" sx={{ fontSize: "4rem", marginBottom: "2rem", textAlign: "center", fontWeight: "bold", color: theme.palette.mode === 'dark' ? '#FFF' : '#000' }}>
                    Exclusive Offers
                </Typography>
                <Grid container spacing={2} justifyContent="center">
                    {displayedExclusiveProducts.map((product) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                            <ProductCard product={product} />
                        </Grid>
                    ))}
                </Grid>
            </Box>
            <HowItWorks />
            <CallToActionBox />
            <PollModal />
            <Footer />
        </div>
    );
}
