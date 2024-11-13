// components/products/CategorySection.jsx
import React from 'react';
import { Box, Typography, Card } from '@mui/material';
import Grid from "@mui/material/Grid2";
import { useRouter } from 'next/navigation';
import { useTheme } from "../../../contexts/themeContext";
import Image from 'next/image';

const categoryIcons = {
    Moisturizers: '/categories/moisturizer.png',
    Cleansers: '/categories/cleanser.png',
    'Face Masks': '/categories/masks.png',
    'Face Serums': '/categories/serum.png',
    'Face Care': '/categories/face_care.png',
    Sunscreens: '/categories/sunscreen.png',
};

const productsData = [
    { title: "Cleansers", link: "/products?category=Cleanser" },
    { title: "Face Serums", link: "/products?category=Serum" },
    { title: "Sunscreens", link: "/products?category=Sunscreen" },
    { title: "Moisturizers", link: "/products?category=Moisturizer" },
    { title: "Face Masks", link: "/products?category=Face%20Mask" },
    { title: "Face Care", link: "/products?category=Face%20Care" },
];

const CategorySection = () => {
    const { theme } = useTheme();
    const router = useRouter();

    return (
        <Box sx={{ padding: '2rem', textAlign: 'center', mt: 4, mb: 4 }}>
            <Typography
                sx={{
                    fontSize: '3rem',
                    fontWeight: 'bold',
                    marginBottom: '1.5rem',
                    color: theme.palette.mode === 'light' ? '#000' : '#fff',
                }}
            >
                Explore Categories
            </Typography>
            <Grid container spacing={3} justifyContent="center">
                {productsData.map((category) => (
                    <Grid
                        item
                        xs={6}
                        sm={4}
                        md={2}
                        key={category.title}
                        sx={{
                            cursor: 'pointer',
                            textAlign: 'center',
                            '&:hover': {
                                transform: 'scale(1.05)',
                                transition: 'transform 0.2s',
                            },
                        }}
                        onClick={() => {
                            router.push(category.link);
                        }}
                    >
                        <Card
                            sx={{
                                padding: '1rem',
                                borderRadius: '16px',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                backgroundColor: theme.palette.mode === 'light' ? '#fff' : 'transparent',
                                boxShadow: theme.palette.mode === 'light' ? "0px 4px 12px rgba(0, 0, 0, 0.1)" : "none",
                                height: "200px",
                                width: "200px",
                            }}
                        >
                            <Box
                                sx={{
                                    width: category.title === "Sunscreens" ? "90px" : "150px",
                                    height: category.title === "Sunscreens" ? "90px" : "150px",
                                    top: category.title === "Sunscreens" ? "3rem" : "none",
                                    display: 'flex',
                                    position: "relative",
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <Image
                                    src={categoryIcons[category.title] || '/categories/default.png'}
                                    alt={category.title}
                                    width={category.title === "Sunscreens" ? 90 : 150}
                                    height={category.title === "Sunscreens" ? 90 : 150}
                                    style={{ objectFit: 'contain' }}
                                />
                            </Box>
                            <Typography
                                sx={{
                                    fontSize: '1.5rem',
                                    fontWeight: 'bold',
                                    color: theme.palette.mode === 'light' ? '#212121' : '#fff',
                                    textAlign: "center",
                                    marginTop: 'auto',
                                }}
                            >
                                {category.title}
                            </Typography>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default CategorySection;
