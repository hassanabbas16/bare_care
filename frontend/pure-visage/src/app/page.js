"use client";
import { useTheme } from "../contexts/themeContext";
import Typography from "@mui/material/Typography";
import Footer from "../components/footer/Footer";
import Navbar from "../components/navbar/Navbar";
import HeroSection from "../components/Home/Hero/HeroSection";

export default function Home() {
    const { toggleTheme, theme } = useTheme();

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
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    flexGrow: 1,  // Push footer to the bottom
                }}
            >
                <Typography variant="h6">
                    Welcome to the theme test page. Modify the theme context to see changes.
                </Typography>
                <button
                    onClick={toggleTheme}
                    style={{
                        backgroundColor: theme.palette.primary.main,
                        color: theme.palette.primary.contrastText,
                    }}
                    className="rounded-full px-6 py-2 transition-colors"
                >
                    Toggle Theme
                </button>
            </div>

            <Footer />
        </div>
    );
}
