import React, { useState, useEffect } from 'react';
import { Typography, Box, Tabs, Tab, Card, CardContent, CircularProgress } from '@mui/material';
import { styled, keyframes } from '@mui/system';
import Grid from '@mui/material/Grid2';
import axios from 'axios';
import MarqueeSwiper from '../../components/common/MarqueeSwiper';

// Flip animation for cards
const fadeInUp = keyframes`
    0% {
        opacity: 0;
        transform: translateY(20px);
    }
    100% {
        opacity: 1;
        transform: translateY(0);
    }
`;

// Styled components for the flip card effect
const CardWrapper = styled(Box)({
    perspective: '1000px',
    width: '300px',
    height: '350px',
    animation: `${fadeInUp} 0.6s ease-out both`,
});

const FlipCard = styled(Box)({
    position: 'relative',
    width: '100%',
    height: '100%',
    transformStyle: 'preserve-3d',
    transition: 'transform 0.6s',
    '&:hover': {
        transform: 'rotateY(180deg)',
    },
});

const FlipCardInner = styled(Box)({
    position: 'relative',
    width: '100%',
    height: '100%',
    transformStyle: 'preserve-3d',
});

const FlipCardFront = styled(Card)({
    position: 'absolute',
    width: '100%',
    height: '100%',
    backfaceVisibility: 'hidden',
});

const FlipCardBack = styled(Card)({
    position: 'absolute',
    width: '100%',
    height: '100%',
    backfaceVisibility: 'hidden',
    transform: 'rotateY(180deg)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#38b593',
    color: 'white',
});

const TipsWithTabs = () => {
    const [selectedCategory, setSelectedCategory] = useState("General");
    const [tips, setTips] = useState([]);
    const [loading, setLoading] = useState(false);

    const categories = ["Acne", "Dry Skin", "Sun Care", "Anti-Aging", "Oily Skin", "General", "Sensitive Skin", "Hydration", "Diet", "Eye Care", "Lip Care", "Hand Care", "Body Care"];

    const handleTabChange = (event, newValue) => {
        setSelectedCategory(newValue);
    };

    useEffect(() => {
        const fetchTips = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`/api/tips?category=${selectedCategory}`);
                const tipsData = response.data.tips;

                // Pick 5 random tips
                const randomTips = tipsData.sort(() => 0.5 - Math.random()).slice(0, 10);
                setTips(randomTips);
            } catch (error) {
                console.error('Error fetching tips:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTips();
    }, [selectedCategory]);
    const marqueeTexts = ["Glow-up tips just for you 💅", "Skincare secrets unlocked! 🔐", "Your daily dose of beauty wisdom ✨"];

    return (
        <Box sx={{ width: '100%' }}>
            <MarqueeSwiper texts={marqueeTexts} speed={20000} dashboard={true} />
            <Box sx={{padding: "3rem"}}>
                <Typography variant="h4" sx={{ fontSize: '2.4rem', fontWeight: 'bold', mb: 3, color: "black" }}>
                    Tips for You!
                </Typography>

                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                    <Tabs
                        value={selectedCategory}
                        onChange={handleTabChange}
                        variant="scrollable"
                        scrollButtons="auto"
                        sx={{
                            '.MuiTabs-flexContainer': {
                                justifyContent: 'center',
                            },
                        }}
                    >
                        {categories.map((category) => (
                            <Tab
                                key={category}
                                label={category}
                                value={category}
                            />
                        ))}
                    </Tabs>
                </Box>

                {loading ? (
                    <Box display="flex" justifyContent="center" alignItems="center" height="200px">
                        <CircularProgress />
                    </Box>
                ) : (
                    <Grid container spacing={3} sx={{ justifyContent: 'center' }}>
                        {tips.map((tip, index) => (
                            <Grid item key={index}>
                                <CardWrapper>
                                    <FlipCard>
                                        <FlipCardInner>
                                            <FlipCardFront>
                                                <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', backgroundColor: '#f0f0f0' }}>
                                                    <img
                                                        src={`/images/${selectedCategory.toLowerCase().replace(" ", "-")}.jpg`}
                                                        alt={selectedCategory}
                                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                    />
                                                </CardContent>
                                            </FlipCardFront>
                                            <FlipCardBack>
                                                <CardContent>
                                                    <Typography variant="h6" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                                                        {tip.tip_content}
                                                    </Typography>
                                                </CardContent>
                                            </FlipCardBack>
                                        </FlipCardInner>
                                    </FlipCard>
                                </CardWrapper>
                            </Grid>
                        ))}
                    </Grid>
                )}
            </Box>
        </Box>
    );
};

export default TipsWithTabs;
