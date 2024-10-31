"use client";
import React, { useState, useEffect } from "react";
import {
    Box,
    Typography,
    IconButton,
    Button,
    useMediaQuery,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Image from "next/image";
import {
    NavbarContainer,
    NavbarInnerContainer,
    NavbarRightContainer,
    NavLinksContainer,
} from "../mui/NavbarPkgs";
import MoonIcon from "../../public/navbar/Moon.svg";
import UserIcon from "../../public/navbar/User.svg";
import EllipsisIcon from "../../public/navbar/Ellipsis.svg";
import { useTheme } from "../../contexts/themeContext";
import SunIcon from "@mui/icons-material/WbSunny";
import Link from "next/link";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const productsData = [
    { title: "Cleansers", link: "/products?category=Cleanser" },
    { title: "Face Serums", link: "/products?category=Serum" },
    { title: "Sunscreens", link: "/products?category=Sunscreen" },
    { title: "Moisturizers", link: "/products?category=Moisturizer" },
    { title: "Face Masks", link: "/products?category=Face%20Mask" },
    { title: "Face Care", link: "/products?category=Face%20Care" },
];

// Styled components
export const NavLinkDropDownContainer = styled(Box)(({ theme }) => ({
    position: "relative",
}));

export const DropDownLink = styled(Typography)(({ theme }) => ({
    fontSize: "1.5rem",
    color: "#D5D5D5",
    cursor: "pointer",
    fontFamily: "DMSans",
    fontWeight: "300",
}));

export const NavLinkButton = styled(Button)(({ theme }) => ({
    color: "#FFF",
    textTransform: "none",
    fontSize: "1.5rem",
    fontWeight: "300",
    background: "none",
    boxShadow: "none",
    "&:hover": {
        background: "none",
        boxShadow: "none",
    },
}));

export const NavLink = styled(Typography)(({ theme }) => ({
    color: "#FFF",
    textDecoration: "none",
    fontSize: "1.5rem",
    fontWeight: "300",
    cursor: "pointer",
    "&:hover": {
        textDecoration: "underline",
    },
}));

export const DropdownBox = styled(Box)(({ theme }) => ({
    position: "absolute",
    top: "100%",
    left: "-2rem",
    zIndex: 2,
    backgroundColor: "rgba(0, 0, 0, 1)",
    padding: theme.spacing(4),
    borderRadius: "8px",
    width: "15rem",
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(1.5),
    marginTop: theme.spacing(1),
}));

import { useRouter } from "next/navigation";

const NavbarLarge = () => {
    const { toggleTheme, theme } = useTheme();
    const [isProductsOpen, setIsProductsOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const checkSession = async () => {
            const response = await fetch('/api/auth/session');
            const result = await response.json();
            setIsLoggedIn(result.loggedIn);
        };

        checkSession();
    }, []);

    const handleProductsToggle = () => {
        setIsProductsOpen(!isProductsOpen);
    };

    const handleCategoryClick = (link) => {
        router.push(link);
        setIsProductsOpen(false);
    };

    const handleUserClick = () => {
        if (isLoggedIn) {
            router.push('/dashboard');
        } else {
            router.push('/login');
        }
    };

    return (
        <NavbarContainer>
            <NavbarInnerContainer>
                <Typography
                    variant="h4"
                    sx={{
                        fontWeight: 700,
                        color: "#fff",
                        marginTop: "0.75rem",
                        "@media (max-width: 768px)": {
                            fontSize: "2rem",
                        },
                        "@media (max-width: 480px)": {
                            fontSize: "1.5rem",
                        },
                    }}
                >
                    Bare Care.
                </Typography>

                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        gap: "6rem",
                        "@media (max-width: 1368px)": {
                            gap: "6rem",
                        },
                        "@media (max-width: 768px)": {
                            flexDirection: "column",
                            gap: "1.5rem",
                            position: "static",
                            transform: "none",
                            top: "auto",
                            left: "auto",
                        },
                    }}
                >
                    <Link href="/" passHref>
                        <NavLink component="a">Home</NavLink>
                    </Link>

                    <NavLinkDropDownContainer>
                        <NavLinkButton
                            onClick={handleProductsToggle}
                            endIcon={
                                <ArrowDropDownIcon
                                    sx={{ marginLeft: "0.5rem", color: "#FFF" }}
                                />
                            }
                            sx={{ zIndex: "10" }}
                        >
                            Products
                        </NavLinkButton>

                        {isProductsOpen && (
                            <DropdownBox>
                                {productsData.map((product, index) => (
                                    <DropDownLink
                                        key={index}
                                        onClick={() => handleCategoryClick(product.link)}
                                    >
                                        {product.title}
                                    </DropDownLink>
                                ))}
                            </DropdownBox>
                        )}
                    </NavLinkDropDownContainer>

                    <Link href="/blog" passHref>
                        <NavLink component="a">Blog</NavLink>
                    </Link>
                    <Link href="/" passHref>
                        <NavLink component="a">Contact Us</NavLink>
                    </Link>
                </Box>

                <NavLinksContainer>
                    <NavbarRightContainer>
                        <IconButton onClick={handleUserClick}>
                            <Image src={UserIcon} alt="User Icon" width={18} height={18} />
                        </IconButton>
                        <IconButton onClick={toggleTheme}>
                            {theme.palette.mode === "dark" ? (
                                <SunIcon sx={{ fontSize: "2rem", color: "white" }} />
                            ) : (
                                <Image
                                    src={MoonIcon}
                                    alt="Moon Icon"
                                    width={21}
                                    height={21}
                                />
                            )}
                        </IconButton>
                    </NavbarRightContainer>
                </NavLinksContainer>
            </NavbarInnerContainer>
        </NavbarContainer>
    );
};

const NavbarSmall = () => {
    const { toggleTheme, theme } = useTheme();
    const [drawerOpen, setDrawerOpen] = useState(false);
    const router = useRouter();

    const handleUserClick = () => {
        const session = localStorage.getItem('supabase-session');
        if (session) {
            router.push('/dashboard');
        } else {
            router.push('/login');
        }
    };

    const toggleDrawer = (open) => () => setDrawerOpen(open);

    return (
        <NavbarContainer>
            <NavbarInnerContainer>
                <IconButton onClick={toggleDrawer(true)}>
                    <Image src={EllipsisIcon} alt="Menu Icon" width={24} height={24} />
                </IconButton>

                <NavbarRightContainer>
                    <IconButton onClick={handleUserClick}>
                        <Image src={UserIcon} alt="User Icon" width={24} height={24} />
                    </IconButton>
                    <IconButton onClick={toggleTheme}>
                        {theme.palette.mode === "dark" ? (
                            <SunIcon sx={{ fontSize: "2rem", color: "white" }} />
                        ) : (
                            <Image src={MoonIcon} alt="Moon Icon" width={21} height={21} />
                        )}
                    </IconButton>
                </NavbarRightContainer>
            </NavbarInnerContainer>
        </NavbarContainer>
    );
};

const Navbar = () => {
    const isSmallScreen = useMediaQuery("(max-width:950px)");

    return isSmallScreen ? <NavbarSmall /> : <NavbarLarge />;
};

export default Navbar;
