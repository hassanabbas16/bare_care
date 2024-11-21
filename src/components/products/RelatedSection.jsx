// components/products/RelatedSection.jsx

import React from 'react';
import { Box, Typography, Card } from '@mui/material';
import Grid from "@mui/material/Grid2";
import ProductCard from './ProductCard';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useTheme } from "../../contexts/themeContext";
import { useMediaQuery } from "@mui/material";

const RelatedSection = ({ type, category, brand, products, brands }) => {
    const { theme } = useTheme();
    const router = useRouter();

    const isScreen1368 = useMediaQuery("(max-width: 1368px)");

    if (type === 'category') {
        const relatedProducts = products.filter(
            (product) => product.category === category
        );

        const shuffledProducts = [...relatedProducts].sort(() => 0.5 - Math.random());
        const displayedProducts = isScreen1368
            ? shuffledProducts.slice(0, 4)
            : shuffledProducts.slice(0, 5);


        return (
            <Box sx={{ padding: '2rem', display: "flex", textAlign: 'center', justifyContent: "center", alignItems: "center", mt: 4, mb: 4 }}>
                <Card
                    sx={{
                        minHeight: '300px',
                        maxWidth: "90%",
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
                            fontSize: '3rem',
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

        const shuffledBrands = [...otherBrands].sort(() => 0.5 - Math.random());
        const displayedBrands = shuffledBrands.slice(0, 5);

        const brandLogos = {
            'CeraVe': '/products/brands/cerave.png',
            'DIOR': '/products/brands/dior.png',
            'The Ordinary': '/products/brands/ordinary.png',
            'Neutrogena': '/products/brands/neutrogena.svg',
            'Clinique': '/products/brands/clinique.svg',
            'Garnier': '/products/brands/garnier.png',
            'COSRX': '/products/brands/cosrx.png',
            'The Inkey List': '/products/brands/inkey.png',
            'La Roche Posay': '/products/brands/posay.png',
            'Derma Shine': '/products/brands/derma.png',
            // Add other brand logos here as needed
        };

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
                            fontSize: '3rem',
                            fontWeight: 'bold',
                            marginBottom: '1.5rem',
                            color: theme.palette.mode === 'light' ? '#000' : '#fff',
                        }}
                    >
                        Brands
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
                                <Box sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    height: "250px",
                                    padding: "1rem",
                                    boxSizing: "border-box",
                                    borderRadius: "8px",
                                    backgroundColor: theme.palette.mode === 'light' ? '#fff' : 'transparent',
                                }}
                                >
                                    <Image
                                        src={brandLogos[brandName] || '/brands/default.png'}
                                        alt={brandName}
                                        width={150}
                                        height={150}
                                        style={{ objectFit: 'contain' }}
                                    />
                                    <Typography
                                        sx={{
                                            fontSize: '2rem',
                                            fontWeight: 'bold',
                                            color: theme.palette.mode === 'light' ? '#212121' : '#fff',
                                            textAlign: "center",
                                            marginTop: 'auto',
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
