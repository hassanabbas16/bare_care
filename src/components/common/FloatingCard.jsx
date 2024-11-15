// FloatingCard.jsx
import React from 'react';
import { Card, Box, Typography } from '@mui/material';
import VerifiedIcon from "@mui/icons-material/Verified";

const FloatingCard = ({ icon, title, description, top, left, right }) => {
    return (
        <Card
            sx={{
                position: "absolute",
                top: top || "50%",
                left: left || "auto",
                right: right || "auto",
                transform: "translateY(-50%)",
                padding: "1.5rem",
                borderRadius: "20px",
                boxShadow: "0px 6px 20px rgba(0, 0, 0, 0.1)",
                backgroundColor: (theme) => theme.palette.background.default,
                maxWidth: "320px",
                textAlign: "center",
                zIndex: "10",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: "1rem",
                }}
            >
                {icon ? (
                    icon
                ) : (
                    <VerifiedIcon sx={{ fontSize: "3rem", color: (theme) => theme.palette.primary.main }} />
                )}
            </Box>
            <Typography
                variant="h6"
                sx={{
                    fontWeight: 500,
                    fontSize: "1.2rem",
                    color: (theme) => theme.palette.primary.main,
                    marginBottom: "0.5rem",
                }}
            >
                {title || "Authenticity Guaranteed"}
            </Typography>
            <Typography variant="body2" sx={{ color: "#777" }}>
                {description || "All our products are 100% authentic and backed by our satisfaction guarantee."}
            </Typography>
        </Card>
    );
};

export default FloatingCard;
