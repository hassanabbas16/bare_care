import React, { useState } from 'react';
import { Box, Typography, Button, TextField, FormControl, RadioGroup, FormControlLabel, Radio, Paper } from '@mui/material';

const SkinQuiz = () => {
    const [quizData, setQuizData] = useState({
        skinType: '',
        concerns: '',
        hydration: '',
    });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        setQuizData({
            ...quizData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = () => {
        // Placeholder: Process quiz data here
        setSubmitted(true);
    };

    if (submitted) {
        return (
            <Box>
                <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#38b593' }}>Thank you!</Typography>
                <Typography variant="body1" sx={{ mt: 2 }}>
                    Based on your answers, we’ll provide tailored recommendations.
                </Typography>
            </Box>
        );
    }

    return (
        <Paper elevation={4} sx={{ p: 3, mt: 2 }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#38b593' }}>Skin Quiz</Typography>
            <Typography variant="body1" sx={{ mt: 1, mb: 2 }}>Answer the following questions to help us understand your skin type:</Typography>

            <FormControl component="fieldset" fullWidth sx={{ mt: 2 }}>
                <Typography variant="h6">What is your skin type?</Typography>
                <RadioGroup name="skinType" value={quizData.skinType} onChange={handleChange} row>
                    <FormControlLabel value="dry" control={<Radio />} label="Dry" />
                    <FormControlLabel value="oily" control={<Radio />} label="Oily" />
                    <FormControlLabel value="combination" control={<Radio />} label="Combination" />
                    <FormControlLabel value="sensitive" control={<Radio />} label="Sensitive" />
                </RadioGroup>
            </FormControl>

            <TextField
                label="What are your main skin concerns? (e.g., acne, dryness)"
                name="concerns"
                value={quizData.concerns}
                onChange={handleChange}
                fullWidth
                sx={{ mt: 2 }}
                multiline
                rows={2}
            />

            <FormControl component="fieldset" fullWidth sx={{ mt: 2 }}>
                <Typography variant="h6">How well does your skin retain moisture?</Typography>
                <RadioGroup name="hydration" value={quizData.hydration} onChange={handleChange} row>
                    <FormControlLabel value="well" control={<Radio />} label="Well" />
                    <FormControlLabel value="average" control={<Radio />} label="Average" />
                    <FormControlLabel value="poorly" control={<Radio />} label="Poorly" />
                </RadioGroup>
            </FormControl>

            <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                sx={{ mt: 3, backgroundColor: '#38b593', '&:hover': { backgroundColor: '#2d8c74' } }}
            >
                Submit Quiz
            </Button>
        </Paper>
    );
};

export default SkinQuiz;
