"use client";
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
            <div style={{ flex: "1" }}>{children}</div>
        </div>
    );
}
