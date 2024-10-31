"use client";
import React, { createContext, useContext, useState } from "react";
import { createTheme, ThemeProvider as MuiThemeProvider } from "@mui/material/styles";

// Light theme: Fresh and pastel-like, soft tones
const lightTheme = createTheme({
    palette: {
        mode: "light",
        primary: {
            main: "#A0C9B8",        // Soft green
            dark: "#66A697",        // Deeper green for contrast
            contrastText: "#FFFFFF", // White text on primary
            text1: "#333333",        // Dark gray for headings
            text2: "#555555",        // Lighter gray for subtext
        },
        secondary: {
            main: "#F9B5C1",         // Soft pink accent
            light: "#FFC1B9",        // Lighter pink for contrast
        },
        background: {
            default: "#FFFFFF",      // White background
            paper: "#F6F6F6",        // Very light gray for cards/paper
        },
    },
    typography: {
        fontFamily: "Poppins, sans-serif",  // Consistent typography
    },
});

// Dark theme: Rich, bold tones with contrast
const darkTheme = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: "#6AB78F",         // Soft green (a bit stronger in dark mode)
            dark: "#3D7558",         // Darker green for contrast
            contrastText: "#FFFFFF", // White text on primary
            text1: "#E0E0E0",        // Light gray for headings
        },
        secondary: {
            main: "#E84877",         // Bold pinkish red for accent
            light: "#F5A3B3",        // Softer pink for contrast
        },
        background: {
            default: "#1B1B1F",      // Dark background
            paper: "#2C2C31",        // Dark gray for cards/paper
        },
    },
    typography: {
        fontFamily: "Poppins, sans-serif",  // Consistent typography
    },
});

// Context for toggling between themes
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
