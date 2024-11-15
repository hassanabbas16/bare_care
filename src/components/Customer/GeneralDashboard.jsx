"use client";

import React, { useState, useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import Grid from "@mui/material/Grid2";
import Recommendations from './Recommendations';
import Wishlist from './Wishlist';
import TipsCard from './TipsCard';

const GeneralDashboard = ({ onQuizClick, category = 'general' }) => {
    const [tips, setTips] = useState([]);

    useEffect(() => {
        const fetchTips = async () => {
            try {
                // Fetch tips based on the selected category
                const response = await fetch(`/api/tips?category=${category}`);
                if (!response.ok) throw new Error('Failed to fetch tips');

                const data = await response.json();

                // Ensure we are working with an array and take only the first 3 tips
                setTips(Array.isArray(data.tips) ? data.tips.slice(0, 3) : []);
            } catch (error) {
                console.error('Error fetching tips:', error);
                setTips([]); // Set tips to an empty array in case of error
            }
        };

        fetchTips();
    }, [category]); // Re-fetch tips if the category changes

    const tipBackgrounds = ['#FFDEE9', '#C6F7E2', '#E3D0FF'];

    return (
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 3, mt: 5 }}>
            <Box sx={{ flex: 8, padding: "0 3rem" }}>
                <Typography sx={{ fontWeight: 'bold', mb: 2, fontSize: "2.4rem", color: "black" }}>Recommendations</Typography>
                <Recommendations />

                <Typography sx={{ fontWeight: 'bold', mt: 4, mb: 2, fontSize: "2.4rem", color: "black" }}>Wishlist</Typography>
                <Wishlist />
            </Box>

            <Box sx={{ flex: 2, display: 'flex', flexDirection: 'column', gap: 3, padding: "0 3rem" }}>
                <Typography sx={{ fontWeight: 'bold', mb: 2, fontSize: "2.4rem", color: "black" }}>Tips</Typography>
                <Grid container spacing={3}>
                    {tips.map((tip, index) => (
                        <Grid item xs={12} key={index}>
                            <TipsCard
                                tipContent={tip.tip_content}
                                category={tip.category}
                                backgroundColor={tipBackgrounds[index % tipBackgrounds.length]}
                            />
                        </Grid>
                    ))}
                </Grid>

                <Box sx={{ mt: 4, p: 3, backgroundColor: '#E0F7FA', borderRadius: 2, textAlign: 'center', padding: "2rem" }}>
                    <Typography sx={{ fontWeight: 'bold', mb: 1, fontSize: "2.4rem", color: "black" }}>
                        Take the Skin Quiz Now!
                    </Typography>
                    <Typography sx={{ color: '#004D40', mb: 2, fontSize: "1.6rem" }}>
                        Discover your skin type and get personalized recommendations tailored just for you.
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => onQuizClick('Skin Quiz')}
                        sx={{ fontSize: "1.8rem"}}
                    >
                        Start Skin Quiz
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default GeneralDashboard;
