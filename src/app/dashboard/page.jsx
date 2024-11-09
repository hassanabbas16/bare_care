"use client";

import React, { useState, useEffect } from 'react';
import { Box, Toolbar, Typography } from '@mui/material';
import Navbar from '../../components/Customer/Navbar';
import Sidebar from '../../components/Customer/Sidebar';
import SkinQuiz from '../../components/Customer/SkinQuiz';
import Recommendations from '../../components/Customer/Recommendations';
import Tips from '../../components/Customer/Tips';
import Wishlist from '../../components/Customer/Wishlist';
import CustomerBlogs from '../../components/Customer/CustomerBlogs'; // Import the new component
import { supabase } from '../../lib/supabaseClient';

const CustomerDashboard = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [selectedTab, setSelectedTab] = useState('Skin Quiz');
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            setLoading(true);

            try {
                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), 5000);

                const response = await fetch('/api/auth/session', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                    signal: controller.signal,
                });
                clearTimeout(timeoutId);

                if (!response.ok) throw new Error('Failed to fetch session');

                const result = await response.json();
                console.log("Session fetch result:", result);

                if (result.loggedIn) {
                    setUser(result.user);
                } else {
                    window.location.href = "/login";
                }
            } catch (error) {
                console.error("Failed to fetch session or request timed out:", error);
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
            case 'Skin Quiz':
                return <SkinQuiz />;
            case 'Recommendations':
                return <Recommendations />;
            case 'Tips':
                return <Tips />;
            case 'Wishlist':
                return <Wishlist />;
            case 'Blogs': // New Blogs Tab
                return <CustomerBlogs />;
            default:
                return <SkinQuiz />;
        }
    };

    if (loading) {
        return <Typography>Loading...</Typography>;
    }

    if (!user) {
        return <Typography>Redirecting to login...</Typography>;
    }

    return (
        <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden', position: 'relative' }}>
            <Navbar toggleDrawer={toggleDrawer} drawerOpen={drawerOpen} user={user} />
            <Sidebar drawerOpen={drawerOpen} toggleDrawer={toggleDrawer} handleTabChange={handleTabChange} />
            <Box component="main" sx={{ flexGrow: 1, p: 3, overflowY: 'auto', position: 'relative' }}>
                <Toolbar />
                {renderTabContent()}
            </Box>
        </Box>
    );
};

export default CustomerDashboard;
