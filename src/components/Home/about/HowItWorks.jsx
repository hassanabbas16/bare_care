"use client";
import React from "react";
import { Box, Grid, Typography, styled, keyframes } from "@mui/material";
import { useTheme } from "../../../contexts/themeContext";
// Importing Material-UI Icons
import CloudDownloadIcon from "@mui/icons-material/CloudDownload"; // For scraping products
import MemoryIcon from "@mui/icons-material/Memory"; // For AI assessment
import VerifiedIcon from "@mui/icons-material/Verified"; // For authenticity check
import VisibilityIcon from "@mui/icons-material/Visibility"; // For displaying products

// Animation keyframes for fade-in effect
const fadeInUp = keyframes`
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
`;

// Define the steps in the "How It Works" process
const works = [
    {
        id: 1,
        icon: <CloudDownloadIcon fontSize="3rem" />,
        title: "Scraping Products",
        description: "We scrape products from trusted websites to build our extensive database.",
    },
    {
        id: 2,
        icon: <MemoryIcon fontSize="3rem" />,
        title: "AI Assessment",
        description: "Our AI model analyzes reviews, ratings, and comparisons to assess authenticity.",
    },
    {
        id: 3,
        icon: <VerifiedIcon fontSize="3rem" />,
        title: "Authenticity Check",
        description: "Products are verified for quality by comparing with similar items.",
    },
    {
        id: 4,
        icon: <VisibilityIcon fontSize="3rem" />,
        title: "Display on Website",
        description: "Only verified and authentic products are showcased on our platform.",
    },
];

// Styled components for layout and responsiveness
const SectionContainer = styled(Box)(({ theme }) => ({
    position: "relative",
    padding: "2rem 0",
    marginTop: "5rem",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
}));

const ResponsiveGrid = styled(Grid)(({ theme }) => ({
    width: "90%",
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)", // Four columns for large screens
    gap: "2rem",
    "@media (max-width: 1200px)": {
        gridTemplateColumns: "repeat(2, 1fr)",
    },
    "@media (max-width: 600px)": {
        gridTemplateColumns: "1fr", // Stacked layout for mobile
    },
}));

export default function HowItWorks() {
    const { theme } = useTheme();

    console.log("Current theme:", theme); // Log the theme to check if it's applied correctly

    return (
        <SectionContainer>
            <Box sx={{ display: "flex", justifyContent: "center", marginBottom: "2rem" }}>
                <Typography sx={{ fontSize: "4rem", fontWeight: "bold", color: theme.palette.mode === 'light' ? '#000' : '#fff' }}>HOW IT WORKS</Typography>
            </Box>

            <ResponsiveGrid container>
                {works.map((work, index) => (
                    <Box
                        key={work.id}
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            textAlign: "center",
                            padding: "4rem",
                            border: `1px solid ${theme.palette.mode === "light" ? "#ccc" : "#444"}`,
                            borderRadius: "16px",
                            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                            backgroundColor: theme.palette.mode === "light" ? "#fff" : "#333",
                            animation: `${fadeInUp} 0.8s ease-in-out ${0.2 * index}s 1 forwards`,
                        }}
                    >
                        <Box
                            sx={{
                                color: theme.palette.mode === "light" ? "rgb(160, 201, 184)" : "#90caf9",
                                fontSize: "7rem",
                            }}
                        >
                            {work.icon}
                        </Box>
                        <Typography sx={{ fontWeight: "bold", marginBottom: "0.5rem", fontSize: "2rem", color: theme.palette.mode === 'light' ? '#000' : "#fff" }}>
                            {work.title}
                        </Typography>
                        <Typography sx={{ color: theme.palette.mode === 'light' ? "#666" : "#fff", fontSize: "1.6rem", fontWeight: "400"  }}>
                            {work.description}
                        </Typography>
                    </Box>
                ))}
            </ResponsiveGrid>
        </SectionContainer>
    );
}
