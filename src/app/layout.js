"use client";
import { ThemeProvider } from "../contexts/themeContext";
import { ComparisonProvider } from "../contexts/ComparisonContext";
import "./globals.css";

export default function RootLayout({ children }) {
    return (
        <html lang="en">
        <body>
        <ComparisonProvider>
        <ThemeProvider>{children}</ThemeProvider>
        </ComparisonProvider>
        </body>
        </html>
    );
}
