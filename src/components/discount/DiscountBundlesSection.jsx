// components/discounts/DiscountBundlesSection.jsx
import React from "react";
import { Box, Typography, Grid, Card } from "@mui/material";
import ProductCard from "../../components/products/ProductCard";
import { useTheme } from "../../contexts/themeContext";

const DiscountBundlesSection = ({ bundles }) => {
    const { theme } = useTheme();

    return (
        <Box sx={{ padding: "2rem" }}>
            <Typography variant="h4" sx={{ fontSize: "4rem", marginBottom: "2rem", textAlign: "center", fontWeight: "bold" }}>
                Discounted Bundles
            </Typography>
            <Grid container spacing={4} justifyContent="center">
                {bundles.slice(0, 3).map((bundle, index) => (
                    <Grid item xs={12} sm={6} md={5} lg={5} key={index} sx={{ display: "flex", gap: "1rem", flexDirection: "column" }}>
                        <Card
                            sx={{
                                minHeight: "300px",
                                borderRadius: "24px",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between",
                                padding: "3rem",
                                backgroundColor: theme.palette.mode === "light" ? "#fff" : "transparent",
                                color: theme.palette.mode === "light" ? "#212121" : "#fff",
                                boxShadow: theme.palette.mode === "light" ? "0px 4px 12px rgba(0, 0, 0, 0.1)" : "none",
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
    );
};

export default DiscountBundlesSection;
