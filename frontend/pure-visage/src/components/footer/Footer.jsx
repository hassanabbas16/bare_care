"use client";
import React from "react";
import { IconButton, Link as MuiLink } from "@mui/material";
import {
    FooterContainer,
    FooterInnerContainer,
    FooterLogoContainer,
    FooterLinksContainer,
    FooterSocialIconsContainer,
    FooterBottomContainer,
    FooterText } from "../mui/FooterPkgs";
import { Facebook, Instagram, Twitter, YouTube, Email } from "@mui/icons-material";
import { useTheme } from "../../contexts/themeContext";

export default function Footer() {
    const { theme } = useTheme();

    return (
        <FooterContainer>
            <FooterInnerContainer>
                <FooterLogoContainer variant="h4">
                    Bare Care.
                </FooterLogoContainer>

                <FooterLinksContainer>
                    <MuiLink href="/" sx={{ color: "#FFF", textDecoration: "none", fontSize: "1.5rem", fontWeight: "300" }}>
                        Home
                    </MuiLink>
                    <MuiLink href="/" sx={{ color: "#FFF", textDecoration: "none", fontSize: "1.5rem", fontWeight: "300" }}>
                        Products
                    </MuiLink>
                    <MuiLink href="/" sx={{ color: "#FFF", textDecoration: "none", fontSize: "1.5rem", fontWeight: "300" }}>
                        Blog
                    </MuiLink>
                    <MuiLink href="/" sx={{ color: "#FFF", textDecoration: "none", fontSize: "1.5rem", fontWeight: "300" }}>
                        Contact Us
                    </MuiLink>
                </FooterLinksContainer>

                <FooterSocialIconsContainer>
                    <IconButton href="https://facebook.com" sx={{ color: "#FFF" }}>
                        <Facebook sx={{ fontSize: "1.8rem" }} />
                    </IconButton>
                    <IconButton href="https://instagram.com" sx={{ color: "#FFF" }}>
                        <Instagram sx={{ fontSize: "1.8rem" }} />
                    </IconButton>
                    <IconButton href="https://twitter.com" sx={{ color: "#FFF" }}>
                        <Twitter sx={{ fontSize: "1.8rem" }} />
                    </IconButton>
                    <IconButton href="https://youtube.com" sx={{ color: "#FFF" }}>
                        <YouTube sx={{ fontSize: "1.8rem" }} />
                    </IconButton>
                    <IconButton href="#" sx={{ color: "#FFF" }}>
                        <Email sx={{ fontSize: "1.8rem" }} />
                    </IconButton>
                </FooterSocialIconsContainer>
            </FooterInnerContainer>

            <FooterBottomContainer>
                <FooterText variant="body2">
                    © 2024 Bare Care. All rights reserved.
                </FooterText>
            </FooterBottomContainer>
        </FooterContainer>
    );
}