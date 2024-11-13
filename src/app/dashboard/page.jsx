// app/dashboard/page.jsx
"use client";

import React, { useState, useEffect } from 'react';
import { Box, Toolbar, Typography } from '@mui/material';
import Navbar from '../../components/Customer/Navbar';
import Sidebar from '../../components/Customer/Sidebar';
import SkinQuiz from '../../components/Customer/SkinQuiz';
import Recommendations from '../../components/Customer/Recommendations';
import TipsWithTabs from '../../components/Customer/Tips';
import Wishlist from '../../components/Customer/Wishlist';
import CustomerBlogs from '../../components/Customer/CustomerBlogs';
import GeneralDashboard from '../../components/Customer/GeneralDashboard';
import FloatingCircle from '../../components/common/FloatingCircle';

const CustomerDashboard = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [selectedTab, setSelectedTab] = useState('Dashboard');
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const marqueeTexts = {
        Dashboard: ["Welcome! Let's get that glow up!", "Ready to slay today? 💅", "Your skin journey starts here! 🌟"],
        'Skin Quiz': ["What's your skin vibe? Take the quiz to find out! 🎯", "Get to know your skin like a pro!", "Let’s find your skin’s BFFs! 🌈"],
        Recommendations: ["We’ve got your beauty essentials covered! 💄", "Curated for you, because you’re special! 💖", "Peep these recs, they're fire 🔥"],
        Tips: ["Glow-up tips just for you 💅", "Skincare secrets unlocked! 🔐", "Your daily dose of beauty wisdom ✨"],
        Wishlist: ["Manifesting those skincare goals 🌟", "Wishlisted and ready to cop 🛍️", "Dream products waiting for you 💖"],
        Blogs: ["Latest tea on skincare and beauty 🍵", "Stay woke with skincare trends 👀", "Your beauty inspo, all in one place ✨"]
    };

    useEffect(() => {
        const fetchUser = async () => {
            setLoading(true);
            try {
                const response = await fetch('/api/auth/session', { method: 'GET', credentials: 'include' });
                if (!response.ok) throw new Error('Failed to fetch session');

                const result = await response.json();
                if (result.loggedIn) {
                    setUser(result.user);
                } else {
                    window.location.href = "/login";
                }
            } catch (error) {
                console.error("Failed to fetch session:", error);
                window.location.href = "/login";
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    const toggleDrawer = () => setDrawerOpen((prev) => !prev);
    const handleTabChange = (tab) => setSelectedTab(tab);

    const renderTabContent = () => {
        switch (selectedTab) {
            case 'Dashboard':
                return <GeneralDashboard onQuizClick={handleTabChange} />;
            case 'Skin Quiz':
                return <SkinQuiz />;
            case 'Recommendations':
                return <Recommendations />;
            case 'Tips':
                return <TipsWithTabs />;
            case 'Wishlist':
                return <Wishlist />;
            case 'Blogs':
                return <CustomerBlogs />;
            default:
                return <GeneralDashboard onQuizClick={handleTabChange} />;
        }
    };

    if (loading) return <Typography>Loading...</Typography>;
    if (!user) return <Typography>Redirecting to login...</Typography>;

    return (
        <Box
            sx={{
                display: 'flex',
                height: '100vh',
                overflow: 'hidden',
                position: 'relative',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundImage: `url('/dash1.png')`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center, bottom right',
                    opacity: 0.7,
                    zIndex: 0,
                },
                zIndex: 1,
            }}
        >
            <FloatingCircle size="400px" top="-10%" left="-40%" dark />
            <FloatingCircle size="500px" top="40%" right="-20%" />
            <FloatingCircle size="600px" bottom="0" left="-10%" />
            <Navbar toggleDrawer={toggleDrawer} drawerOpen={drawerOpen} user={user} />
            <Sidebar drawerOpen={drawerOpen} toggleDrawer={toggleDrawer} handleTabChange={handleTabChange} />

            <Box component="main" sx={{ flexGrow: 1, overflowY: 'auto', position: 'relative', zIndex: 1 }}>
                <Toolbar />
                {renderTabContent()}
            </Box>
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    zIndex: 0,
                }}
            />
        </Box>
    );
};

export default CustomerDashboard;
