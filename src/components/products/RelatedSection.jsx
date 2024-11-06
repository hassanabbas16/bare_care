// components/products/RelatedSection.jsx

import React from 'react';
import { Box, Typography } from '@mui/material';
import Grid from "@mui/material/Grid2";
import ProductCard from './ProductCard';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const RelatedSection = ({ type, category, brand, products, brands }) => {
    const router = useRouter();

    if (type === 'category') {
        // Get products in the same category
        const relatedProducts = products.filter(
            (product) => product.category === category
        );

        // Shuffle the array and select a few products
        const shuffledProducts = [...relatedProducts].sort(() => 0.5 - Math.random());
        const displayedProducts = shuffledProducts.slice(0, 5); // Show 5 products

        return (
            <Box sx={{ padding: '2rem' }}>
                <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
                    Related Products
                </Typography>
                <Grid container spacing={2}>
                    {displayedProducts.map((product) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                            <ProductCard product={product} />
                        </Grid>
                    ))}
                </Grid>
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
            // Add other brand logos here
        };

        return (
            <Box sx={{ padding: '2rem' }}>
                <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
                    Other Brands
                </Typography>
                <Grid container spacing={2}>
                    {displayedBrands.map((brandName) => (
                        <Grid item xs={6} sm={4} md={3} key={brandName}>
                            <Box
                                sx={{
                                    cursor: 'pointer',
                                    textAlign: 'center',
                                    '&:hover': {
                                        transform: 'scale(1.05)',
                                        transition: 'transform 0.2s',
                                    },
                                }}
                                onClick={() => {
                                    // Navigate to the brand's products page
                                    router.push(`/products?brand=${encodeURIComponent(brandName)}`);
                                }}
                            >
                                <Image
                                    src={brandLogos[brandName]}
                                    alt={brandName}
                                    width={150}
                                    height={150}
                                    objectFit="contain"
                                />
                                <Typography variant="subtitle1" sx={{ mt: 1 }}>
                                    {brandName}
                                </Typography>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        );
    } else {
        return null;
    }
};

export default RelatedSection;
