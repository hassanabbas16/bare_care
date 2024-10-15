"use client";
import React, { createContext, useContext, useState } from "react";
import { createTheme, ThemeProvider as MuiThemeProvider } from "@mui/material/styles";

const lightTheme = createTheme({
    palette: {
        mode: "light",
        primary: {
            main: "#60FF69",
            dark: "#66DAB2",
            contrastText: "#00F0B9",
            text1: "#F97F77",
            text2: "#FFC1B9",
        },
        secondary: {
            main: "#F5BFB9",
            light: "#FFC1B9",
        },
        background: {
            default: "#F6E7DD",
            paper: "#FFF1E6",
        },
    },
    typography: {
        fontFamily: "Poppins, sans-serif",
    },
});

const darkTheme = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: "#4B8070",
            dark: "#9DD2AF",
            contrastText: "#D6F0D9",
            text1: "#F3A09D",
        },
        secondary: {
            main: "#BC9FA9",
            light: "#F3A09D",
        },
        background: {
            default: "#2B2C34",
            paper: "#1F1F23",
        },
    },
    typography: {
        fontFamily: "Poppins, sans-serif",
    },
});

const ThemeContext = createContext({
    theme: lightTheme,
    toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(lightTheme);

    const toggleTheme = () => {
        setTheme(theme === lightTheme ? darkTheme : lightTheme);
    };

    return (
        <MuiThemeProvider theme={theme}>
            <ThemeContext.Provider value={{ theme, toggleTheme }}>
                {children}
            </ThemeContext.Provider>
        </MuiThemeProvider>
    );
};
