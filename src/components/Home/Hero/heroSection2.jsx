import React from 'react';
import { Box, Typography, Button } from '@mui/material';

const HeroSection = () => {
    return (
        <Box
            sx={{
                position: 'relative',
                paddingTop: "5rem",
                height: { xs: '60vh', sm: '75vh', md: '100vh' },
                backgroundImage: 'url(/HomeBanner.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                marginBottom: "6rem",
                textAlign: 'center',
                p: 3,
            }}
        ></Box>
    );
};

export default HeroSection;
