// FloatingCircle.jsx
import React from 'react';
import { Box } from '@mui/material';
import Image from 'next/image';
import dottedcircle from '../../../public/Home/dottedcircle.png';
import { useTheme } from "../../contexts/themeContext";

const FloatingCircle = ({ size = "100px", top, left, right, bottom, dark = false }) => {
    const { theme } = useTheme();
    return (
        <Box
            sx={{
                position: "absolute",
                top: top || "auto",
                left: left || "auto",
                right: right || "auto",
                bottom: bottom || "auto",
                width: size,
                height: size,
                opacity: 0.1,
                zIndex: 0,
                filter: theme.palette.mode === 'dark' ? 'invert(1)' : 'none',
            }}
        >
            <Image
                src={dottedcircle}
                alt="Dotted Circle"
                layout="fill"
                objectFit="contain"
            />
        </Box>
    );
};

export default FloatingCircle;
