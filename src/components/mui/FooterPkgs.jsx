import { Box, IconButton, Typography, Link as MuiLink } from "@mui/material";
import { styled } from "@mui/system";

export const FooterContainer = styled('footer')(({ theme }) => ({
    backgroundColor: "#000000",
    color: theme.palette.mode === "light" ? `#212121` : "#fff",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: "2rem 0",
    position: "relative",
}));

export const FooterInnerContainer = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 12rem",
    marginBottom: "2rem",
    '@media (max-width: 1368px)': {
        padding: "0 6rem",
    },
    '@media (max-width: 1024px)': {
        padding: "0 3rem",
    },
    '@media (max-width: 768px)': {
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        padding: "0 2rem",
    },
}));

export const FooterLogoContainer = styled(Typography)(({ theme }) => ({
    fontWeight: 700,
    color: "#fff",
    '@media (max-width: 768px)': {
        fontSize: "2rem",
    },
    '@media (max-width: 480px)': {
        fontSize: "1.5rem",
    },
}));

export const FooterLinksContainer = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: 'center',
    position: 'absolute',
    top: '26%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    gap: "6rem",
    '@media (max-width: 1368px)': {
        gap: '6rem',
    },
    '@media (max-width: 768px)': {
        flexDirection: 'column',
        gap: '1.5rem',
        position: 'static',
        transform: 'none',
        top: 'auto',
        left: 'auto',
    },
}));

export const FooterSocialIconsContainer = styled(Box)(({ theme }) => ({
    display: "flex",
    gap: "3rem",
    '@media (max-width: 768px)': { gap: "2rem" },
    '@media (max-width: 480px)': { gap: "1rem" },
}));

export const FooterText = styled(Typography)(({ theme }) => ({
    color: theme.palette.mode === "light" ? "#fff" : "#fff",
    fontSize: "1.5rem",
    fontWeight: "500",
    '@media (max-width: 768px)': {
        fontSize: "1.2rem",
    },
    '@media (max-width: 480px)': {
        fontSize: "1rem",
    },
}));

export const FooterBottomContainer = styled(Box)(({ theme }) => ({
    textAlign: "center",
    paddingTop: "1rem",
    paddingBottom: "2rem",
    '@media (max-width: 768px)': {
        paddingBottom: "1rem",
    },
}));