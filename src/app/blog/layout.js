"use client";
import React from "react";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import { useTheme } from "../../contexts/themeContext";
import MarqueeSwiper from "../../components/common/MarqueeSwiper";
import FloatingCircle from "../../components/common/FloatingCircle";

export default function RootLayout({ children }) {
    const { theme } = useTheme();

    const marqueeTexts = [
        "Dive into our skincare world! Discover fresh ideas, trusted routines, and everything you need to know about keeping your skin radiant.",
        "Explore the latest skincare trends and tips to maintain a healthy and glowing complexion.",
        "Join our community for exclusive insights and personalized skincare recommendations.",
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
