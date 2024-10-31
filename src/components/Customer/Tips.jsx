import React from 'react';
import { Box, Typography, List, ListItem, ListItemText, Paper } from '@mui/material';

const tips = [
    "Always cleanse your face before bed.",
    "Use a moisturizer suited to your skin type.",
    "Apply sunscreen daily, even on cloudy days.",
    "Exfoliate once a week to remove dead skin cells.",
    "Stay hydrated and maintain a balanced diet.",
];

const Tips = () => {
    return (
        <Paper elevation={4} sx={{ p: 3, mt: 2 }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#38b593' }}>Skincare Tips</Typography>
            <List sx={{ mt: 2 }}>
                {tips.map((tip, index) => (
                    <ListItem key={index}>
                        <ListItemText primary={tip} />
                    </ListItem>
                ))}
            </List>
        </Paper>
    );
};

export default Tips;
