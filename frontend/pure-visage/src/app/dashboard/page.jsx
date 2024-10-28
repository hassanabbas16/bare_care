"use client";
import React, { useState, useEffect } from 'react';
import { Box, Toolbar, Typography } from '@mui/material';
import Navbar from '../../components/Customer/Navbar';
import Sidebar from '../../components/Customer/Sidebar';
import SkinQuiz from '../../components/Customer/SkinQuiz';
import Recommendations from '../../components/Customer/Recommendations';
import Tips from '../../components/Customer/Tips';
import Wishlist from '../../components/Customer/Wishlist';
import { supabase } from '../../lib/supabaseClient';

const CustomerDashboard = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [selectedTab, setSelectedTab] = useState('Skin Quiz');
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            setLoading(true);
            let session = await supabase.auth.getSession();
            if (!session?.data) {
                // Fallback to check localStorage if session is not available immediately
                const localSession = localStorage.getItem('supabase-session');
                if (localSession) {
                    session = JSON.parse(localSession);
                }
            }

            if (session?.data) {
                setUser(session.data.user);
            } else {
                window.location.href = "/login";
            }
            setLoading(false);
        };

        fetchUser();

        const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
            if (session?.user) {
                setUser(session.user);
            } else {
                window.location.href = "/login";
            }
        });

        return () => {
            authListener?.subscription.unsubscribe();
        };
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
