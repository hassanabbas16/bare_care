// components/discounts/ExclusiveOffersSection.jsx
import React from "react";
import { Box, Typography, Grid } from "@mui/material";
import ProductCard from "../../components/products/ProductCard";
import { useTheme } from "../../contexts/themeContext";

const ExclusiveOffersSection = ({ exclusiveProducts }) => {
    const { theme } = useTheme();
    return (
        <Box sx={{ padding: "2rem", marginBottom: "10rem" }}>
            <Typography variant="h4" sx={{ fontSize: "4rem", marginBottom: "2rem", textAlign: "center", fontWeight: "bold" }}>
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
    );
};

export default ExclusiveOffersSection;
