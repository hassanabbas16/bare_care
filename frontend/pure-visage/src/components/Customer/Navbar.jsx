"use client";
import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useEffect, useState } from 'react';

const Navbar = ({ toggleDrawer, user }) => {
    const [isScrolled, setIsScrolled] = useState(false);

    const handleScroll = () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        setIsScrolled(scrollTop > 0);
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <AppBar
            position="fixed"
            sx={{
                zIndex: (theme) => theme.zIndex.drawer + 2,
                backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.8)' : '#fff',
                boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)',
                backdropFilter: isScrolled ? 'blur(8px)' : 'none',
                transition: 'background-color 0.3s ease',
            }}
        >
            <Toolbar>
                <IconButton color="inherit" aria-label="open drawer" onClick={toggleDrawer} edge="start">
                    <MenuIcon />
                </IconButton>
                <Typography variant="h4" noWrap component="div" sx={{ flexGrow: 1, fontSize: "1.8rem", fontWeight: "bold" }}>
                    {`Welcome, ${user.user_metadata?.display_name || 'User'}!`}
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton edge="end" color="inherit">
                        <AccountCircleIcon />
                    </IconButton>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
