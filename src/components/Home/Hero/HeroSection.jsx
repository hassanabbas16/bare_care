// HeroSection.js
"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Typography, Button, Box, styled } from "@mui/material";
import { gsap } from "gsap";
import { useTheme } from "../../../contexts/themeContext";
import Image from "next/image";
import herobg from "../../../../public/Home/herobg2.png";
import HomeSocialsBox from "./HomeSocials";
import FloatingCard from "../../common/FloatingCard";
import FloatingCircle from "../../common/FloatingCircle";

const HeroSection = () => {
    const { theme } = useTheme();

    const typographyRef = useRef(null);
    const tlRef = useRef(null);
    const [currentText, setCurrentText] = useState("");

    const lines = useMemo(
        () => [
            "Beauty Secret in Your Pocket!",
            "Offering beauty products for those who travel a lot.",
        ],
        []
    );

    const handleScroll = () => {
        window.scrollBy({
            top: window.innerHeight,
            behavior: "smooth",
        });
    };

    useEffect(() => {
        const container = typographyRef.current;

        tlRef.current = gsap.timeline({ repeat: -1 });

        lines.forEach((line) => {
            tlRef.current
                .to(container, {
                    opacity: 0,
                    duration: 0.5,
                    ease: "power2.inOut",
                    onComplete: () => setCurrentText(line),
                })
                .to(container, {
                    opacity: 1,
                    duration: 0.5,
                    ease: "power2.inOut",
                })
                .to({}, { duration: 3 });
        });

        setCurrentText(lines[0]);
        gsap.set(container, { opacity: 1 });

        return () => {
            if (tlRef.current) tlRef.current.kill();
        };
    }, [lines]);

    return (
        <HomeHeroContainer
            sx={{
                position: "relative",
                width: "100%",
                height: "100vh",
                backgroundColor: theme.palette.background.default,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                zIndex: "8",
            }}
        >
            <Box
                sx={{
                    marginTop: "8%",
                    marginBottom: "10%",
                    height: "100%",
                    display: "flex",
                    width: "90%",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        maxWidth: "600px",
                        padding: "0 0 0 5rem",
                    }}
                >
                    <Typography
                        sx={{
                            fontWeight: 900,
                            marginBottom: "1rem",
                            fontSize: {
                                xs: "3rem",
                                sm: "3.5rem",
                                md: "4rem",
                                lg: "5rem",
                            },
                            textAlign: "left",
                            color: theme.palette.primary.main,
                        }}
                    >
                        Bare Care.
                    </Typography>

                    <Typography
                        sx={{
                            fontWeight: 700,
                            marginBottom: "2rem",
                            fontSize: {
                                xs: "2rem",
                                sm: "3rem",
                                md: "3.5rem",
                                lg: "4rem",
                            },
                            textAlign: "left",
                            color: theme.palette.mode === 'dark' ? '#FFF' : '#000',
                        }}
                    >
                        Pakistan&apos;s 1st Authentic Products Site.
                    </Typography>

                    <Box ref={typographyRef}>
                        <Typography
                            sx={{
                                letterSpacing: "1px",
                                textAlign: "left",
                                fontWeight: "300",
                                fontSize: {
                                    xs: "1.2rem",
                                    sm: "1.5rem",
                                    md: "2rem",
                                    lg: "3rem",
                                },
                                color: theme.palette.mode === 'dark' ? '#C1C1C1' : '#525252',
                                marginBottom: "3rem",
                            }}
                        >
                            {currentText}
                        </Typography>
                    </Box>
                    <Button
                        variant="contained"
                        sx={{
                            padding: "1rem 2rem",
                            fontSize: "2rem",
                            fontWeight: "bold",
                            backgroundColor: theme.palette.primary.main,
                            color: "white",
                            "&:hover": {
                                backgroundColor: theme.palette.primary.dark,
                            },
                        }}
                    >
                        TAKE THE QUIZ!
                    </Button>
                </Box>

                <Box
                    sx={{
                        position: "absolute",
                        right: "0",
                        width: "50%",
                        height: "100%",
                        clipPath: "polygon(30% 0, 100% 0, 100% 100%, 30% 100%, 0% 50%)",
                        top: "0.5rem",
                        zIndex: "1",
                    }}
                >
                    <Image
                        src={herobg}
                        alt="Hero Background"
                        fill
                        objectFit="cover"
                        style={{ transform: "scaleX(-1)" }}
                    />

                    <HomeSocialsBox />
                </Box>
            </Box>

            <FloatingCard
                top="20%"
                right="30%"
                title="Certified by Beauty Experts"
                description="Our products have been reviewed and certified by over 20 international beauty experts."
            />
            <FloatingCard
                top="32%"
                right="35%"
                title="Trusted by Thousands"
                description="Join thousands of satisfied customers who trust us to provide the best beauty products for their skincare routines."
            />
            <FloatingCircle size="500px" top="-15%" left="-10%" dark />
            <FloatingCircle size="400px" bottom="-5%" right="30%" />
        </HomeHeroContainer>
    );
};

export default HeroSection;

export const HomeHeroContainer = styled(Box)(({ theme }) => ({
    height: "100vh",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
}));
