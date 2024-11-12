"use client";
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from "swiper/modules";
import { Typography, Box } from '@mui/material';

import 'swiper/css';
import 'swiper/css/autoplay';

const MarqueeSwiper = ({ texts = [], speed = 30000 }) => {
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
                top: "7.5rem",
                zIndex: 98,
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
                                    xs: '1rem',
                                    sm: '1.2rem',
                                    md: '1.5rem',
                                    lg: '1.7rem',
                                },
                            }}
                        >
                            {text}
                        </Typography>
                        <Box
                            sx={{
                                width: {
                                    xs: '20px',
                                    sm: '30px',
                                    md: '50px',
                                    lg: '70px',
                                },
                            }}
                        ></Box>
                    </SwiperSlide>
                ))}
                {/* Repeat texts for smooth infinite loop */}
                {texts.map((text, index) => (
                    <SwiperSlide
                        key={`${index}-repeat`}
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
                                    xs: '1rem',
                                    sm: '1.2rem',
                                    md: '1.5rem',
                                    lg: '1.7rem',
                                },
                            }}
                        >
                            {text}
                        </Typography>
                        <Box
                            sx={{
                                width: {
                                    xs: '20px',
                                    sm: '30px',
                                    md: '50px',
                                    lg: '70px',
                                },
                            }}
                        ></Box>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default MarqueeSwiper;
