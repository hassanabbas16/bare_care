"use client";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import { useTheme } from "../../contexts/themeContext";
import MarqueeSwiper from "../../components/common/MarqueeSwiper";
import React from "react";

export default function RootLayout({ children }) {
    const { theme } = useTheme();

    const marqueeTexts = [
        "Unmissable deals on top skincare products. Save big while taking care of your skin!",
        "Explore exclusive discounts and limited-time offers on the best skincare essentials.",
        "Unlock radiant skin with our special discounted bundles, only available for a limited time!",
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
