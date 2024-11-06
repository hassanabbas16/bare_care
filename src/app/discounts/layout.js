"use client";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import { useTheme } from "../../contexts/themeContext";

export default function RootLayout({ children }) {
    const { theme } = useTheme();

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
            <div style={{ flex: "1" }}>{children}</div>
            <Footer />
        </div>
    );
}
