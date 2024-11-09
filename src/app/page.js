// src/app/page.jsx
"use client";
import { useTheme } from "../contexts/themeContext";
import Typography from "@mui/material/Typography";
import Footer from "../components/footer/Footer";
import Navbar from "../components/navbar/Navbar";
import HeroSection from "../components/Home/Hero/HeroSection";
import PollModal from "../components/Home/Polls/PollModal";

export default function Home() {
    const { theme } = useTheme();

    return (
        <div
            style={{
                backgroundColor: theme.palette.background.default,
                color: theme.palette.primary.contrastText,
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
            }}
        >
            <Navbar />
            <HeroSection />
            <PollModal />
            <Footer />
        </div>
    );
}
