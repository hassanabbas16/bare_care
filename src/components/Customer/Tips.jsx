import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from "swiper/modules";
import { Typography, Box, Card, CardContent, CardMedia, Button, Stack, Tabs, Tab } from '@mui/material';
import { styled } from '@mui/system';
import 'swiper/css';
import 'swiper/css/autoplay';

// Swiper Component
const MarqueeSwiper = ({ texts = ["Hello, radiant souls! Let’s dive into a sea of skincare knowledge and surf our way to glowing skin!"], speed = 30000 }) => {
    return (
        <div
            style={{
                position: "relative",
                overflow: "hidden",
                backgroundColor: "black",
                color: "white",
                padding: "10px 0",
                width: "100%",
                whiteSpace: "nowrap",
                textAlign: "center",
                top: "0",
                zIndex: 100,
                marginBottom: "24px",
            }}
        >
            <Swiper
                modules={[Autoplay]}
                slidesPerView="auto"
                spaceBetween={50}
                loop={true}
                speed={speed}
                autoplay={{
                    delay: 0,
                    disableOnInteraction: false,
                }}
                allowTouchMove={false}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                {texts.map((text, index) => (
                    <SwiperSlide
                        key={index}
                        style={{
                            width: 'auto',
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <Typography
                            variant="body1"
                            sx={{
                                whiteSpace: 'nowrap',
                                fontSize: {
                                    xs: '0.8rem',
                                    sm: '1rem',
                                    md: '1.2rem',
                                    lg: '1.4rem',
                                },
                            }}
                        >
                            {text}
                        </Typography>
                        <Box
                            sx={{
                                width: {
                                    xs: '15px',
                                    sm: '20px',
                                    md: '30px',
                                    lg: '50px',
                                },
                            }}
                        ></Box>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

// Sample data for each category
const tipsData = {
    acne: [
        "Wash your face twice a day to prevent clogged pores.",
        "Avoid harsh scrubbing on acne-prone areas.",
        "Use non-comedogenic skincare products to reduce breakouts.",
        "Limit dairy intake as it can contribute to acne.",
        "Avoid touching your face to prevent spreading bacteria.",
    ],
    hyperpigmentation: [
        "Apply sunscreen daily to prevent dark spots from worsening.",
        "Use products with vitamin C to brighten the skin.",
        "Avoid touching or picking at dark spots.",
        "Try chemical exfoliants like AHA/BHA for gentle skin renewal.",
        "Incorporate retinoids into your routine with caution.",
    ],
    scarring: [
        "Massage scars with vitamin E oil to improve texture.",
        "Use silicone sheets or gels to reduce scar visibility.",
        "Apply sunscreen to prevent scars from darkening.",
        "Try a scar cream with onion extract.",
        "Consider microneedling for deeper scars (consult a professional).",
    ],
    "oily-skin": [
        "Use a gentle foaming cleanser to remove excess oil.",
        "Avoid heavy, greasy moisturizers.",
        "Incorporate clay masks to absorb excess oil.",
        "Blot your skin with oil-absorbing sheets as needed.",
        "Use a toner with witch hazel to control oil production.",
    ],
    "dry-skin": [
        "Use a cream-based cleanser to maintain moisture.",
        "Apply a hydrating serum before moisturizer.",
        "Use a rich, emollient moisturizer twice daily.",
        "Avoid hot showers, as they can dry out your skin.",
        "Incorporate hyaluronic acid for extra hydration.",
    ],
};

// Tips Component with Tabs
const TipsWithTabs = () => {
    const [selectedCategory, setSelectedCategory] = useState("acne");

    const handleTabChange = (event, newValue) => {
        setSelectedCategory(newValue);
    };

    return (
        <Box sx={{ width: '100%', textAlign: 'center' }}>
            {/* Category Tabs */}
            <Tabs
                value={selectedCategory}
                onChange={handleTabChange}
                centered
                variant="scrollable"
                scrollButtons="auto"
                sx={{ marginBottom: 3 }}
            >
                {Object.keys(tipsData).map((category) => (
                    <Tab
                        key={category}
                        label={category.replace("-", " ").replace(/^\w/, (c) => c.toUpperCase())}
                        value={category}
                    />
                ))}
            </Tabs>

            {/* Display Tips for Selected Category */}
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, justifyContent: 'center', mt: 2 }}>
                {tipsData[selectedCategory].map((tip, index) => (
                    <Card key={index} sx={{ width: 300, padding: 2 }}>
                        <CardContent>
                            <Typography variant="body1">{tip}</Typography>
                        </CardContent>
                    </Card>
                ))}
            </Box>
        </Box>
    );
};

// Main General Page Component
const GeneralPage = () => {
    return (
        <Box>
            <MarqueeSwiper />
            <TipsWithTabs />
        </Box>
    );
};

export default GeneralPage;
