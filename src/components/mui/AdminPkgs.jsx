"use client";
import {
    AppBar,
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    Grid,
    IconButton,
    InputBase,
    styled,
    TableCell,
    TableContainer,
    TableRow,
    Toolbar,
    Typography
} from '@mui/material';
import React from "react";

export const CardHeading = styled(Typography)(({ theme }) => ({
    fontSize: '1.6rem',
    fontWeight: 'bold',
    color: theme.palette.text.primary,
    marginBottom: '10px',
}));

export const CardSubheading = styled(Typography)(({ theme }) => ({
    fontSize: '1.4rem',
    color: theme.palette.text.secondary,
    marginBottom: '10px',
}));

export const TableHeading = styled(Typography)(({ theme }) => ({
    fontSize: '1.4rem',
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: '#3f51b5',
    padding: '10px',
}));

export const SectionHeading = styled(Typography)(({ theme }) => ({
    fontSize: '1.8rem',
    fontWeight: 'bold',
    color: theme.palette.text.primary,
    marginBottom: '20px',
}));

export const StyledCard = styled(Card)(() => ({
    position: "relative",
    borderRadius: 16,
    padding: 16,
    minWidth: 300,
    boxShadow: "0 0 20px 0 rgba(0,0,0,0.12)",
    transition: "0.3s",
    "&:hover": {
        boxShadow: "0 4px 20px 0 rgba(0,0,0,0.12)",
    },
}));

export const ButtonLearnMore = styled(Button)(() => ({
    backgroundColor: "#fff !important",
    color: "#fb703c",
    boxShadow: "0 2px 6px #d0efef",
    borderRadius: 12,
    minWidth: 120,
    textTransform: "initial",
    fontSize: "1.4rem",
    fontWeight: 700,
    letterSpacing: 0,
}));

export const headingStyles = {
    fontWeight: 'bold',
    fontSize: '1.8rem',
    color: '#ffffff',
};

export const CardBody = styled(CardContent)(({ theme }) => ({
    padding: '16px',
    '&:last-child': {
        paddingBottom: '16px',
    },
}));

export const CardActions = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'flex-end',
    padding: '16px',
}));

export const StyledTable = styled(TableContainer)(({ theme }) => ({
    borderRadius: '10px',
    boxShadow: '0 6px 20px rgba(0, 0, 0, 0.15)',
}));

export const TableRowCustom = styled(TableRow)(({ theme }) => ({
    '&:hover': {
        backgroundColor: theme.palette.action.hover,
    },
}));

export const TableCellCustom = styled(TableCell)(({ theme }) => ({
    padding: '10px',
    fontSize: '1.2rem',
    color: theme.palette.text.primary,
}));

export const TableHeaderCell = styled(TableCell)(({ theme }) => ({
    backgroundColor: '#3f51b5',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: '1.4rem',
    padding: '10px',
}));

export const FlexContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100vh',
}));

export const GridContainer = styled(Grid)(({ theme }) => ({
    padding: '20px',
}));

export const GridItem = styled(Grid)(({ theme }) => ({
    padding: '20px',
}));

/* Button Component */
export const PrimaryButton = styled(Button)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    color: '#fff',
    padding: '10px 20px',
    fontSize: '1.4rem',
    '&:hover': {
        backgroundColor: theme.palette.primary.dark,
    },
}));

/* Navbar Components */
export const NavbarContainer = styled(AppBar)(({ theme }) => ({
    backgroundColor: "#fff",
    boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)",
    padding: "0 30px",
    height: "10vh",
    fontFamily: "JakartaSans, sans-serif",
    position: "fixed",
    width: "100%",
    zIndex: 1100,
    transition: "background-color 0.3s ease",
}));

export const NavbarBox = styled(Toolbar)(({ theme }) => ({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
}));

export const NavbarHeading = styled(Typography)(({ theme }) => ({
    fontSize: "1.8rem",
    fontWeight: "bold",
    color: "#333",
    fontFamily: "JakartaSans, sans-serif",
}));

export const NavbarSearch = styled(Box)(({ theme }) => ({
    position: "relative",
    borderRadius: "8px",
    backgroundColor: "#f1f3f4",
    padding: "4px 8px",
    display: "flex",
    alignItems: "center",
    width: "250px",
    boxShadow: "inset 0 1px 3px rgba(0, 0, 0, 0.1)",
    fontSize: "1.2rem",
}));

export const SearchInput = styled(InputBase)(({ theme }) => ({
    marginLeft: theme.spacing(1),
    flex: 1,
    fontSize: "1.2rem",
    color: "#333",
    fontFamily: "JakartaSans, sans-serif",
}));

export const NavbarIcons = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    gap: "3px",
}));

export const IconWrapper = styled(IconButton)(({ theme }) => ({
    color: "#333",
    fontSize: "1.4rem",
}));

/* Reusable Card Components */
export const ProfileCard = styled(Card)(({ theme }) => ({
    borderRadius: "12px",
    width: "33rem",
    textAlign: "center",
    boxShadow: "0 2px 4px -2px rgba(0,0,0,0.24), 0 4px 24px -2px rgba(0, 0, 0, 0.2)",
    transition: "transform 0.3s ease",
    "&:hover": {
        transform: "translateY(-3px)",
    },
}));

export const CardAvatar = styled(Avatar)(({ theme }) => ({
    width: 60,
    height: 60,
    margin: "auto",
    color: "#FEF4C3",
}));

export const CardInfo = styled(Box)(({ theme }) => ({
    textAlign: "center",
    margin: "10px 0",
}));

export const InfoHeading = styled(Typography)(({ theme }) => ({
    fontSize: "1.6rem",
    fontWeight: "bold",
    letterSpacing: "0.5px",
}));

export const InfoSubHeading = styled(Typography)(({ theme }) => ({
    fontSize: "1.4rem",
    color: theme.palette.text.secondary,
}));

export const CardInformationWrapper = styled(Typography)(({ theme }) => ({
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    marginBottom: '0.5rem'
}));
export const CardInformationLabel = styled(Typography)(({ theme }) => ({
    fontSize: "1.2rem",
    fontWeight: "bold",
    textAlign: "left",
    color: theme.palette.text.secondary,
}));
export const CardInformationContent = styled(Typography)(({ theme }) => ({
    fontSize: "1.2rem",
    textAlign: "right",
    color: theme.palette.text.secondary,
}));

export const BookingAvatar = styled(Avatar)(({ theme }) => ({
    width: 40,
    height: 40,
    backgroundColor: theme.palette.primary.main,
    marginBottom: theme.spacing(1),
}));

export const ModalCard = styled(Card)(() => ({
    borderRadius: '16px',
    padding: '20px',
    width: '100%',
    maxWidth: '650px',
    boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)',
}));

export const StyledPattern = () => {
    return (
        <Box
            sx={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                transform: 'translate(70%, 50%)',
                borderRadius: '50%',
                backgroundColor: 'rgba(71, 167, 162, 0.3)',
                padding: '40%',
                '&:before': {
                    position: 'absolute',
                    borderRadius: '50%',
                    content: '""',
                    display: 'block',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    margin: '-16%',
                    backgroundColor: 'rgba(71, 167, 162, 0.15)',
                },
            }}
        />
    );
};

export const ModalButton = styled(Button)(() => ({
    backgroundColor: '#4CAF50',
    color: '#fff',
    marginTop: '20px',
    padding: '10px 20px',
    textTransform: 'none',
    fontWeight: 'bold',
    fontSize: "1.2rem",
    '&:hover': {
        backgroundColor: '#45A049',
    },
}));

export const ModalContentBox = styled(Typography)(() => ({
    padding: "0.8rem 2rem",
    backgroundColor: "#fffff",
    borderRadius: "8px",
    boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "0.8rem",
}));

export const ModalLabel = styled(Typography)(() => ({
    color: "#808080",
    fontSize: "1.4rem",
}));

export const ModalValue = styled(Typography)(() => ({
    fontWeight: "medium",
    fontSize: "1.4rem",
}));