// components/CategoryBanner.jsx
"use client";
import { useRouter } from "next/router";
import { Box, Typography } from "@mui/material";
import productsImage from "../../public/products/products.png";
import cleanserImage from "../../public/products/cleanser.png";
import moisturizerImage from "../../public/products/moisturizer.png";
import serumImage from "../../public/products/serum.png";
import sunscreenImage from "../../public/products/sunscreen.png";
import masksImage from "../../public/products/masks.png";

const CategoryBanner = () => {
    const category = "Serum";

    const categoryImages = {
        Products: productsImage,
        Cleanser: cleanserImage,
        Moisturizer: moisturizerImage,
        Serum: serumImage,
        Sunscreen: sunscreenImage,
        Masks: masksImage,
    };

    const backgroundImage = categoryImages[category] || productsImage;

    return (
        <Box
            sx={{
                width: "100%",
                height: "400px",
                position: "relative",
                backgroundImage: `url(${backgroundImage.src})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
            }}
        >
            <Box
                sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(0, 0, 0, 0.6)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Typography
                    sx={{ color: "#fff", fontWeight: "bold", textTransform: "capitalize", fontSize: "4rem", top: "3rem" }}
                >
                    {category}
                </Typography>
            </Box>
        </Box>
    );
};

export default CategoryBanner;
