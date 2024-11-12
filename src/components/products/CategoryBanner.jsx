// components/products/CategoryBanner.jsx
"use client";
import { Box, Typography } from "@mui/material";
import { useSearchParams } from "next/navigation";
import productsImage from "../../../public/products/products.png";
import cleanserImage from "../../../public/products/cleanser.png";
import moisturizerImage from "../../../public/products/moisturizer.png";
import serumImage from "../../../public/products/serum.png";
import sunscreenImage from "../../../public/products/sunscreen.png";
import masksImage from "../../../public/products/masks.png";
import faceCareImage from "../../../public/products/facecare.png";

// Import brand images
import theOrdinaryImage from "../../../public/products/facecare.png";
import ceraveImage from "../../../public/products/masks.png";
import neutrogenaImage from "../../../public/products/sunscreen.png";
import garnierImage from "../../../public/products/serum.png";
import glamGlowImage from "../../../public/products/moisturizer.png";

const CategoryBanner = ({ category, brand }) => {
    const categoryImages = {
        Products: productsImage,
        Cleanser: cleanserImage,
        Moisturizer: moisturizerImage,
        Serum: serumImage,
        Sunscreen: sunscreenImage,
        "Face Mask": masksImage,
        "Face Care": faceCareImage,
    };

    const brandImages = {
        "The Ordinary": theOrdinaryImage,
        CeraVe: ceraveImage,
        Neutrogena: neutrogenaImage,
        Garnier: garnierImage,
        GlamGlow: glamGlowImage,
    };

    // Determine the background image
    const backgroundImage = brand
        ? brandImages[brand] || productsImage
        : categoryImages[category] || productsImage;

    // Determine the display text
    const displayText = brand || category;

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
                    sx={{
                        color: "#fff",
                        fontWeight: "bold",
                        textTransform: "capitalize",
                        fontSize: "4.4rem",
                    }}
                >
                    {displayText}
                </Typography>
            </Box>
        </Box>
    );
};

export default CategoryBanner;
