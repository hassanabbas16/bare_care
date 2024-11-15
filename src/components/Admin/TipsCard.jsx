import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';

const TipsCard = ({ tipContent, category, backgroundColor }) => {
    return (
        <Card
            sx={{
                background: backgroundColor,
                padding: '24px',
                width: '100%',
                minWidth: '300px',
                height: 'auto',
                position: 'relative',
                borderRadius: '16px',
                boxShadow: '0px 6px 20px rgba(0, 0, 0, 0.1)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
            }}
        >
            <CardContent>
                {/* Category */}
                <Typography
                    sx={{
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        color: '#444',
                        fontSize: '1.6rem',
                        mb: 1,
                    }}
                >
                    {category}
                </Typography>

                {/* Title */}
                <Typography
                    sx={{
                        fontWeight: 700,
                        color: '#222',
                        fontSize: '2rem',
                        mb: 2,
                    }}
                >
                    Admin Insights
                </Typography>

                {/* Content */}
                <Typography
                    sx={{
                        fontSize: '1.4rem',
                        fontWeight: 500,
                        color: '#555',
                        lineHeight: 1.6,
                    }}
                >
                    {tipContent}
                </Typography>
            </CardContent>

            {/* Abstract Decoration */}
            <Box
                sx={{
                    position: 'absolute',
                    top: '-20px',
                    right: '-20px',
                    width: '80px',
                    height: '80px',
                    backgroundColor: 'rgba(255, 255, 255, 0.3)',
                    borderRadius: '50%',
                    zIndex: 1,
                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                }}
            />
        </Card>
    );
};

export default TipsCard;
