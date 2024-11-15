// components/discounts/FlashSaleSection.jsx
import React from "react";
import { Box, Typography, Grid } from "@mui/material";
import { useRouter } from "next/navigation";
import cerave from "../../../public/cerave.png";
import neutrogena from "../../../public/neutrogena.png";
import garnier from "../../../public/garnier.png";
import { useTheme } from "../../contexts/themeContext";

const FlashSaleSection = () => {
    const { theme } = useTheme();
    const router = useRouter();

    return (
        <Box sx={{ marginTop: "6rem", marginBottom: "10rem", textAlign: "center" }}>
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
    );
};

export default FlashSaleSection;
