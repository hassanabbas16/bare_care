"use client";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import { useTheme } from "../../contexts/themeContext";
import MarqueeSwiper from "../../components/common/MarqueeSwiper";
import React from "react";

export default function RootLayout({ children }) {
    const { theme } = useTheme();

    const marqueeTexts = [
        "Find your perfect skincare products, tailored for every skin type and concern.",
        "Browse our curated collection of skincare essentials for a radiant, healthy complexion.",
        "Discover trusted brands and high-quality products to elevate your skincare routine.",
    ];

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh",
                backgroundColor: theme.palette.background.default,
            }}
        >
            <Navbar />
            <MarqueeSwiper texts={marqueeTexts} speed={20_000} />
            <div style={{ flex: "1" }}>{children}</div>
            <Footer />
        </div>
    );
}
