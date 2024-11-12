// components/products/RelatedSection.jsx

import React from 'react';
import { Box, Typography, Card } from '@mui/material';
import Grid from "@mui/material/Grid2";
import ProductCard from './ProductCard';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useTheme } from "../../contexts/themeContext"; // Import theme context

const RelatedSection = ({ type, category, brand, products, brands }) => {
    const { theme } = useTheme();
    const router = useRouter();

    if (type === 'category') {
        const relatedProducts = products.filter(
            (product) => product.category === category
        );

        const shuffledProducts = [...relatedProducts].sort(() => 0.5 - Math.random());
        const displayedProducts = shuffledProducts.slice(0, 5); // Show 5 products

        return (
            <Box sx={{ padding: '2rem', display: "flex", textAlign: 'center', justifyContent: "center", alignItems: "center", mt: 4, mb: 4 }}>
                <Card
                    sx={{
                        minHeight: '300px',
                        maxWidth: "80%",
                        minWidth: "80%",
                        borderRadius: "24px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        padding: "3rem",
                        zIndex: 1,
                        backgroundColor: theme.palette.mode === 'light' ? '#fff' : 'transparent',
                        color: theme.palette.mode === "light" ? '#212121' : '#fff',
                        boxShadow: theme.palette.mode === 'light' ? "0px 4px 12px rgba(0, 0, 0, 0.1)" : "none",
                        marginBottom: "8rem",
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: '4rem',
                            fontWeight: 'bold',
                            marginBottom: '1.5rem',
                            color: theme.palette.mode === 'light' ? '#000' : '#fff',
                        }}
                    >
                        Related Products
                    </Typography>
                    <Grid container spacing={3} justifyContent="center">
                        {displayedProducts.map((product) => (
                            <Grid
                                item
                                xs={12}
                                sm={6}
                                md={4}
                                lg={3}
                                key={product.id}
                                sx={{
                                    transition: 'transform 0.2s',
                                    '&:hover': { transform: 'scale(1.05)' },
                                }}
                            >
                                <ProductCard product={product} />
                            </Grid>
                        ))}
                    </Grid>
                </Card>
            </Box>
        );
    } else if (type === 'brand') {
        const otherBrands = brands.filter((b) => b !== brand);

        // Shuffle and select brands
        const shuffledBrands = [...otherBrands].sort(() => 0.5 - Math.random());
        const displayedBrands = shuffledBrands.slice(0, 4); // Show 4 brands

        // Map brand names to their logo images
        const brandLogos = {
            'The Ordinary': '/brands/theOrdinary.png',
            'CeraVe': '/brands/cerave.png',
            'Neutrogena': '/brands/neutrogena.png',
            'Garnier': '/brands/garnier.png',
            'GlamGlow': '/brands/glamGlow.png',
            // Add other brand logos here as needed
        };

        return (
            <Box sx={{ padding: '2rem', textAlign: 'center', mt: 4, mb: 4 }}>
                <Card
                    sx={{
                        minHeight: '300px',
                        maxWidth: "80%",
                        minWidth: "80%",
                        borderRadius: "24px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        padding: "3rem",
                        zIndex: 1,
                        backgroundColor: theme.palette.mode === 'light' ? '#fff' : 'transparent',
                        color: theme.palette.mode === "light" ? '#212121' : '#fff',
                        boxShadow: theme.palette.mode === 'light' ? "0px 4px 12px rgba(0, 0, 0, 0.1)" : "none",
                        marginBottom: "8rem",
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: '2rem',
                            fontWeight: 'bold',
                            marginBottom: '1.5rem',
                            color: theme.palette.mode === 'light' ? '#212121' : '#fff',
                        }}
                    >
                        Other Brands
                    </Typography>
                    <Grid container spacing={3} justifyContent="center">
                        {displayedBrands.map((brandName) => (
                            <Grid
                                item
                                xs={6}
                                sm={4}
                                md={3}
                                key={brandName}
                                sx={{
                                    cursor: 'pointer',
                                    textAlign: 'center',
                                    '&:hover': {
                                        transform: 'scale(1.05)',
                                        transition: 'transform 0.2s',
                                    },
                                }}
                                onClick={() => {
                                    router.push(`/products?brand=${encodeURIComponent(brandName)}`);
                                }}
                            >
                                <Box>
                                    <Image
                                        src={brandLogos[brandName] || '/brands/default.png'} // Provide a default image if brand logo not found
                                        alt={brandName}
                                        width={150}
                                        height={150}
                                        style={{ objectFit: 'contain' }}
                                    />
                                    <Typography
                                        sx={{
                                            marginTop: '0.5rem',
                                            fontSize: '1.2rem',
                                            fontWeight: 'bold',
                                            color: theme.palette.mode === 'light' ? '#212121' : '#fff',
                                        }}
                                    >
                                        {brandName}
                                    </Typography>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </Card>
            </Box>
        );
    } else {
        return null;
    }
};

export default RelatedSection;
