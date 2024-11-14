"use client";
import { AppBar, Box, IconButton, Toolbar, Typography, Button } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import { useEffect, useState } from 'react';

const Navbar = ({ toggleDrawer, user }) => {
    const [isScrolled, setIsScrolled] = useState(false);

    const handleScroll = () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        setIsScrolled(scrollTop > 0);
    };

    const handleLogout = async () => {
        try {
            const response = await fetch('/api/auth/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });
            if (response.ok) {
                window.location.href = '/';
            }
        } catch (error) {
            console.error('Failed to log out:', error);
        }
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
                padding: '0.5rem 2rem'
            }}
        >
            <Toolbar>
                <IconButton color="black" aria-label="open drawer" onClick={toggleDrawer} edge="start">
                    <MenuIcon />
                </IconButton>
                <Typography variant="h4" noWrap component="div" sx={{ flexGrow: 1, fontSize: "2rem", fontWeight: "bold", color: "black" }}>
                    {`Welcome, ${user.user_metadata?.display_name || 'User'}!`}
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', marginRight: '1rem' }}>
                    <IconButton edge="end" color="black" onClick={() => (window.location.href = '/')}>
                        <HomeIcon />
                    </IconButton>
                </Box>
                {user && (
                    <Button sx={{ color: "black", fontWeight: "bold" }} onClick={handleLogout}>
                        Logout
                    </Button>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
