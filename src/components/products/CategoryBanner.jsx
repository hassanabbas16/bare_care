"use client";
import { Box } from "@mui/material";
import productsImage from "../../../public/products/products.png";
import cleanserImage from "../../../public/products/cleanser.png";
import moisturizerImage from "../../../public/products/moisturizer.png";
import serumImage from "../../../public/products/serum.png";
import sunscreenImage from "../../../public/products/sunscreen.png";
import masksImage from "../../../public/products/masks.png";
import faceCareImage from "../../../public/products/facecare.png";

// Import brand images
import theOrdinaryImage from "../../../public/products/ordinarybrand.png";
import ceraveImage from "../../../public/products/ceravebrand.png";
import neutrogenaImage from "../../../public/products/neutrogenabrand.png";
import garnierImage from "../../../public/products/garnierbrand.png";
import glamGlowImage from "../../../public/products/glamglowbrand.png";

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

    return (
        <Box
            sx={{
                width: "100%",
                height: "50vh",
                position: "relative",
                backgroundImage: `url(${backgroundImage.src})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
            }}
        />
    );
};

export default CategoryBanner;
