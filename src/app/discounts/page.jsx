// pages/discounts/page.jsx
"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Box, Typography, Button, Card } from "@mui/material";
import Grid from "@mui/material/Grid2";
import ProductCard from "../../components/products/ProductCard";
import { useRouter } from "next/navigation";
import discountBanner2 from "../../../public/discountBanner2.png";
import cerave from "../../../public/cerave.png";
import neutrogena from "../../../public/neutrogena.png";
import garnier from "../../../public/garnier.png";
import { useTheme } from "../../contexts/themeContext";
import FloatingCircle from '../../components/common/FloatingCircle';
import CallToActionBox from "../../components/common/CallToActionBox";

const DiscountsPage = () => {
    const { theme } = useTheme();
    const [allDiscountedProducts, setAllDiscountedProducts] = useState([]);
    const [exclusiveProducts, setExclusiveProducts] = useState([]);
    const [bundles, setBundles] = useState([]);
    const [limitedTimeOffers, setLimitedTimeOffers] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const fetchDiscountedProducts = async () => {
            try {
                const response = await fetch("/api/products");
                const data = await response.json();

                // Filter out products with "No discount" in the discount field
                const discountedProducts = data.filter(
                    (product) => product.discount && product.discount.toLowerCase() !== "no discount"
                );

                setAllDiscountedProducts(discountedProducts);

                // Set exclusive offers and limited-time offers
                setExclusiveProducts(getRandomProducts(discountedProducts, 5));
                setLimitedTimeOffers(getRandomProducts(discountedProducts, 6));

                // Create bundles with complementary products
                const bundleSets = [];
                for (let i = 0; i < discountedProducts.length; i += 2) {
                    if (discountedProducts[i + 1]) {
                        bundleSets.push([discountedProducts[i], discountedProducts[i + 1]]);
                    }
                }
                setBundles(bundleSets);
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
            <FloatingCircle size="400px" top="100%" left="10%" dark />
            <FloatingCircle size="500px" top="70%" right="5%" />
            <FloatingCircle size="600px" bottom="-120%" left="-10%" />
            <FloatingCircle size="700px" bottom="-200%" right="5%" />
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
            />

            <Box sx={{ marginTop: "6rem", marginBottom: "6rem", textAlign: "center" }}>
                <Typography variant="h1" sx={{ fontSize: "4rem", fontWeight: "bold", mb: 4, color: theme.palette.mode === 'dark' ? '#FFF' : '#000' }}>
                    Flash Sale!
                </Typography>
                <Grid container spacing={4} justifyContent="center">
                    {[{ img: cerave, label: "Up to 40% OFF", name: "Cerave" },
                        { img: neutrogena, label: "Up to 20% OFF", name: "Neutrogena" },
                        { img: garnier, label: "Up to 50% OFF", name: "Garnier" }].map((product, index) => (
                        <Grid item xs={12} sm={6} md={3} key={index}>
                            <Box
                                onClick={() => router.push(`/products?brand=${product.name}`)}
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
                                    cursor: "pointer",
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
                            <Typography sx={{ mt: 1, fontWeight: "bold", color: "#d32f2f", fontSize: "2rem" }}>
                                {product.label}
                            </Typography>
                            <Typography sx={{ fontSize: "2rem", color: "#333" }}>
                                {product.name}
                            </Typography>
                        </Grid>
                    ))}
                </Grid>
            </Box>

            <Box sx={{ padding: "2rem" }}>
                <Typography variant="h4" sx={{ fontSize: "4rem", marginBottom: "2rem", textAlign: "center", fontWeight: "bold", color: theme.palette.mode === 'dark' ? '#FFF' : '#000' }}>
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

            <Box sx={{ padding: "2rem" }}>
                <Typography variant="h4" sx={{ fontSize: "4rem", marginBottom: "2rem", textAlign: "center", fontWeight: "bold", color: theme.palette.mode === 'dark' ? '#FFF' : '#000' }}>
                    Discounted Bundles
                </Typography>
                <Grid container spacing={4} justifyContent="center">
                    {bundles.slice(0, 3).map((bundle, index) => (
                        <Grid item xs={12} sm={6} md={5} lg={5} key={index} sx={{ display: "flex", gap: "1rem", flexDirection: "column" }}>
                            <Card
                                sx={{
                                    minHeight: '300px',
                                    borderRadius: "24px",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "space-between",
                                    padding: "3rem",
                                    backgroundColor: theme.palette.mode === 'light' ? '#fff' : 'transparent',
                                    color: theme.palette.mode === "light" ? '#212121' : '#fff',
                                    boxShadow: theme.palette.mode === 'light' ? "0px 4px 12px rgba(0, 0, 0, 0.1)" : "none",
                                    animation: `slideInLTR 1s ease-in-out ${1.5 - 0.3 * index}s forwards`,
                                }}
                            >
                                <Typography sx={{ fontWeight: "bold", fontSize: "1.8rem", color: "#1976d2", marginBottom: "1rem" }}>
                                    Bundle Deal {index + 1}
                                </Typography>
                                <Box sx={{ display: "flex", gap: "1rem" }}>
                                    {bundle.map((product) => (
                                        <Box key={product.id} sx={{ flex: 1 }}>
                                            <ProductCard product={product} />
                                        </Box>
                                    ))}
                                </Box>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
            <CallToActionBox />
        </Box>
    );
};

export default dynamic(() => Promise.resolve(DiscountsPage), {
    ssr: false,
});
