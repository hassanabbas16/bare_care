// components/Customer/TipsCard.js
import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';
import { StyledPattern } from '../mui/AdminPkgs';

const TipsCard = ({ tipContent, category, backgroundColor }) => {
    return (
        <Card
            sx={{
                background: backgroundColor,
                padding: '20px',
                width: '100%', 
                minWidth: "300px", 
                height: 'auto',
                position: 'relative',
                borderRadius: '12px',
                boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
            }}
        >
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#666' }}>
                    {category}
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 700, color: '#333' }}>
                    Skincare Tip
                </Typography>
                <Typography variant="body1" sx={{ fontSize: '1rem', fontWeight: 500, color: '#333' }}>
                    {tipContent}
                </Typography>
            </Box>

            {/* Abstract Decoration */}
            <StyledPattern
                sx={{
                    position: 'absolute',
                    top: -20,
                    right: -20,
                    width: 80,
                    height: 80,
                    backgroundColor: 'rgba(255, 255, 255, 0.3)',
                    borderRadius: '50%',
                    zIndex: 1,
                }}
            />
        </Card>
    );
};

export default TipsCard;
