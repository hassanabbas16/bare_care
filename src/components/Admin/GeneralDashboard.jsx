"use client";

import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Grid,
    Card,
    CardContent,
    Button,
} from '@mui/material';
import TipsCard from './TipsCard';
import UserManagement from './Users';
import AdminProducts from './Products';
import {useTheme} from "@/contexts/themeContext";

const GeneralDashboard = () => {
    const { theme } = useTheme();
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalProducts: 0,
        totalPolls: 0,
    });

    const [timeRemaining, setTimeRemaining] = useState(null);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await fetch('/api/admin/analytics');
                if (!response.ok) throw new Error('Failed to fetch analytics data');

                const data = await response.json();

                setStats({
                    totalUsers: data.totalUsers || 0,
                    totalProducts: data.totalProducts || 0,
                    totalPolls: data.totalPolls || 0,
                });
            } catch (error) {
                console.error('Error fetching analytics data:', error);
                setStats({
                    totalUsers: 0,
                    totalProducts: 0,
                    totalPolls: 0,
                });
            }
        };

        fetchStats();
    }, []);

    useEffect(() => {
        const calculateTimeRemaining = () => {
            const now = new Date();
            const startDate = new Date('2024-01-01T00:00:00Z');
            const dayInMs = 24 * 60 * 60 * 1000;
            const cycleLength = 30 * dayInMs;
            const elapsed = now - startDate;
            const timeUntilNextReset = cycleLength - (elapsed % cycleLength);
            setTimeRemaining(timeUntilNextReset);
        };

        calculateTimeRemaining();
        const interval = setInterval(calculateTimeRemaining, 1000); // Update every second

        return () => clearInterval(interval);
    }, []);

    const formatTime = (milliseconds) => {
        const totalSeconds = Math.floor(milliseconds / 1000);
        const days = Math.floor(totalSeconds / (24 * 3600));
        const hours = Math.floor((totalSeconds % (24 * 3600)) / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        return `${days}d ${hours}h ${minutes}m ${seconds}s`;
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 5, mt: 5, px: 3 }}>
            <Box>
                <Typography sx={{ fontWeight: 'bold', mb: 3, fontSize: '2.4rem', color: 'black' }}>
                    Dashboard Overview
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={4}>
                        <TipsCard
                            tipContent={`There are ${stats.totalUsers} users currently registered.`}
                            category="User Statistics"
                            backgroundColor="#FFDEE9"
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TipsCard
                            tipContent={`The database has ${stats.totalProducts} products listed.`}
                            category="Product Statistics"
                            backgroundColor="#C6F7E2"
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TipsCard
                            tipContent={`Currently ${stats.totalPolls} active polls.`}
                            category="Poll Statistics"
                            backgroundColor="#E3D0FF"
                        />
                    </Grid>
                </Grid>
            </Box>

            <Box sx={{ display: 'flex', gap: 3 }}>
                <Card sx={{
                    flex: 7,
                    borderRadius: "24px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    padding: "3rem",
                    backgroundColor: theme.palette.mode === 'light' ? '#fff' : 'transparent',
                    color: theme.palette.mode === "light" ? '#212121' : '#fff',
                    boxShadow: theme.palette.mode === 'light' ? "0px 4px 12px rgba(0, 0, 0, 0.1)" : "none",
                }}>
                    <CardContent>
                        <Typography sx={{ fontWeight: 'bold', mb: 3, fontSize: '2.4rem', color: 'black' }}>
                            Users and Products Management
                        </Typography>
                        <Box sx={{ mb: 5 }}>
                            <UserManagement />
                        </Box>
                        <Box>
                            <AdminProducts />
                        </Box>
                    </CardContent>
                </Card>

                <Card sx={{ flex: 3, p: 3, textAlign: 'center', backgroundColor: '#E0F7FA', maxHeight: "200px" }}>
                    <CardContent>
                        <Typography sx={{ fontWeight: 'bold', mb: 1, fontSize: '2.4rem', color: 'black' }}>
                            Update Products Database
                        </Typography>
                        {timeRemaining !== null ? (
                            <Typography sx={{ color: '#004D40', mb: 2, fontSize: '1.6rem' }}>
                                Time until next update: {formatTime(timeRemaining)}
                            </Typography>
                        ) : (
                            <Typography sx={{ color: '#004D40', mb: 2, fontSize: '1.6rem' }}>
                                Loading timer...
                            </Typography>
                        )}
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => alert('Redirect to product update process')}
                            sx={{ fontSize: '1.8rem' }}
                        >
                            Update Now
                        </Button>
                    </CardContent>
                </Card>
            </Box>
        </Box>
    );
};

export default GeneralDashboard;
