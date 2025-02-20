import React from 'react';
import { Box, Typography, Button, useMediaQuery } from '@mui/material';

const HeroSection = () => {
    const isScreen1368 = useMediaQuery('(max-width: 1368px)');

    return (
        <Box
            sx={{
                position: 'relative',
                marginTop: {xs:"3rem",  md:"6rem", xl:"7rem"},
                height: { xs: '60vh', sm: '75vh', md: 'calc(100vh - 60px)' },
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
                backgroundRepeat: 'no-repeat',
                // top: isScreen1368 ? '6rem' : 'unset',
            }}
        ></Box>
    );
};

export default HeroSection;
