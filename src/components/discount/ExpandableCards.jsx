// components/ExpandingCards.jsx
"use client";
import React from "react";
import { Box, Typography, styled } from "@mui/material";
import heroBg2 from "../../../public/Home/herobg2.png";

const Container = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "2rem",
    maxWidth: "98rem",
    margin: "0 auto",
    padding: "2rem",
    "@media (max-width: 600px)": {
        flexDirection: "column",
    },
}));

const Card = styled(Box)(({ theme, expandDirection }) => ({
    position: "relative",
    width: "calc(50% - 1rem)",
    minHeight: "52rem",
    borderRadius: "10px",
    overflow: "hidden",
    cursor: "pointer",
    transition: "all 0.3s ease",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    backgroundSize: "cover",
    backgroundPosition: "center",
    marginLeft: expandDirection === "right" ? "0" : "auto",
    marginRight: expandDirection === "left" ? "0" : "auto",
    "&:hover": {
        width: "calc(100% - 1rem)",
    },
    "@media (max-width: 900px)": {
        minHeight: "35rem",
        height: "100%",
        width: "100%",
    },
}));

const BackgroundImage = styled(Box)(({ theme, imageUrl }) => ({
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundImage: `url(${imageUrl})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    filter: "brightness(0.3)",
    zIndex: 1,
}));

const Overlay = styled(Box)(({ theme }) => ({
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    zIndex: 2,
}));

const Content = styled(Box)(({ theme }) => ({
    position: "relative",
    zIndex: 3,
    padding: "5rem",
    color: "#fff",
    width: "100%",
    transition: "opacity 0.3s ease",
    "@media (max-width: 900px)": {
        padding: "3rem",
    },
}));

const Number = styled(Typography)({
    fontSize: "4rem",
    fontWeight: 500,
    "@media (max-width: 900px)": {
        fontSize: "2.8rem",
    },
    "@media (max-width: 600px)": {
        fontSize: "2.2rem",
    },
});

const Heading = styled(Typography)(({ theme }) => ({
    fontSize: "4rem",
    fontWeight: 500,
    lineHeight: "1.2",
    "@media (max-width: 900px)": {
        fontSize: "2.8rem",
    },
    "@media (max-width: 600px)": {
        fontSize: "2.2rem",
    },
}));

const ExpandedContent = styled(Box)(({ theme }) => ({
    marginTop: "3rem",
    fontWeight: 300,
    lineHeight: 1.5,
    "@media (max-width: 900px)": {
        fontSize: "2rem",
    },
    "@media (max-width: 600px)": {
        fontSize: "1.6rem",
    },
}));

const BulletList = styled("ul")({
    listStyleType: "none",
    paddingLeft: "0",
    marginTop: "2rem",
    "@media (max-width: 900px)": {
        marginTop: "1rem",
    },
});

const BulletItem = styled("li")({
    display: "flex",
    alignItems: "center",
    marginBottom: "1rem",
    fontSize: "2rem",
    "@media (max-width: 900px)": {
        fontSize: "1.4rem",
    },
    "@media (max-width: 600px)": {
        fontSize: "1.2rem",
    },
});

const CheckmarkIcon = styled("img")({
    width: "20px",
    height: "20px",
    marginRight: "1rem",
});

const cardData = [
    {
        id: 1,
        title: "Skincare Secrets",
        subpara: "Unlock the path to glowing skin with our expert tips:",
        details: [
            "Personalized skincare routines",
            "The magic of natural ingredients",
            "Dermatologist-approved products",
            "Holistic wellness approaches",
        ],
        imageUrl: heroBg2,
    },
    {
        id: 2,
        title: "Exclusive Discounts",
        subpara: "Don't miss out on our limited-time offers:",
        details: [
            "Up to 50% off on top brands",
            "Special bundle deals",
            "Member-only flash sales",
            "Free samples with every order",
        ],
        imageUrl: heroBg2,
    },
];

export default function ExpandingCards() {
    return (
        <Container>
            {cardData.map((card, index) => (
                <Card key={card.id} expandDirection={index === 0 ? "right" : "left"}>
                    <BackgroundImage imageUrl={card.imageUrl} />
                    <Overlay />
                    <Content>
                        <Number>0{card.id}</Number>
                        <Heading>{card.title}</Heading>
                        <ExpandedContent>
                            <Typography
                                variant="body1"
                                sx={{
                                    marginBottom: "2rem",
                                    fontSize: "2.2rem",
                                    "@media (max-width: 900px)": {
                                        fontSize: "1.6rem",
                                    },
                                    "@media (max-width: 600px)": {
                                        fontSize: "1.4rem",
                                    },
                                }}
                            >
                                {card.subpara}
                            </Typography>
                            <BulletList>
                                {card.details.map((detail, idx) => (
                                    <BulletItem key={idx}>
                                        <CheckmarkIcon src="/images/checkmark.png" alt="checkmark" />
                                        {detail}
                                    </BulletItem>
                                ))}
                            </BulletList>
                        </ExpandedContent>
                    </Content>
                </Card>
            ))}
        </Container>
    );
}
