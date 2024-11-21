// app/dashboard/page.jsx
"use client";

import React, { useState, useEffect } from 'react';
import { Box, Toolbar, Typography } from '@mui/material';
import Navbar from '@/components/Admin/Navbar';
import Sidebar from '@/components/Admin/Sidebar';
import AdminProducts from '@/components/Admin/Products';
import UserManagement from '@/components/Admin/Users';
import AdminBlogs from '@/components/Admin/Blogs';
import SkinQuizEntries from '@/components/Admin/SkinQuiz';
import GeneralDashboard from "@/components/Admin/GeneralDashboard";
import PollManagement from "@/components/Admin/Polls";
import FloatingCircle from '../../components/common/FloatingCircle';

const AdminDashboard = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [selectedTab, setSelectedTab] = useState('Review Products');
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

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
                return <GeneralDashboard/>
            case 'Products':
                return <AdminProducts />;
            case 'Users':
                return <UserManagement />;
            case 'Blogs':
                return <AdminBlogs />;
            case 'Skin Quiz':
                return <SkinQuizEntries />;
            case 'Polls':
                return <PollManagement />;
            default:
                return <GeneralDashboard />;
        }
    };

    if (loading) return <Typography>Loading...</Typography>;
    if (!user) return <Typography>Redirecting to login...</Typography>;

    return (
        <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
            <Navbar toggleDrawer={toggleDrawer} user={user} />
            <Sidebar drawerOpen={drawerOpen} toggleDrawer={toggleDrawer} handleTabChange={handleTabChange} />
            <Box component="main" sx={{ flexGrow: 1, overflowY: 'auto', position: 'relative', zIndex: 1 }}>
                <Toolbar />
                {renderTabContent()}
            </Box>
        </Box>
    );
};

export default AdminDashboard;
