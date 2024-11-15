import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, FormControl, RadioGroup, FormControlLabel, Radio, Checkbox, Card, CardContent, Grid } from '@mui/material';
import axios from 'axios';
import { useTheme } from "../../contexts/themeContext";

const SkinQuiz = () => {
    const { theme } = useTheme();
    const [quizData, setQuizData] = useState({
        user_id: '',
        skin_type: '',
        concerns: '',
        sensitivity_level: '',
        breakout_frequency: '',
        allergies: '',
        time_spent: '',
        product_preferences: [],
        natural_importance: '',
        fragrance_free: false,
        budget_preference: '',
        age_range: '',
        allergyDetails: '',
    });
    const [submitted, setSubmitted] = useState(false);
    const [isQuizFilled, setIsQuizFilled] = useState(false);
    const [step, setStep] = useState(0);
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const sessionRes = await fetch('/api/auth/session');
                if (sessionRes.ok) {
                    const sessionData = await sessionRes.json();
                    const userId = sessionData.user.id;
                    setQuizData((prevData) => ({ ...prevData, user_id: userId }));
                    const quizRes = await axios.get('/api/skin-quiz', { params: { user_id: userId } });
                    if (quizRes.data) {
                        setQuizData(quizRes.data);
                        setIsQuizFilled(true);
                    }
                } else {
                    console.error("Failed to fetch user session.");
                }
            } catch (error) {
                console.error("Error fetching user session or quiz data:", error);
            }
        };
        fetchUserData();
    }, []);

    const questions = [
        { label: "Skin Type", question: "What is your skin type?", name: "skin_type", options: ["Oily", "Dry", "Normal", "Combination", "Sensitive"], type: "radio", required: true },
        { label: "Main Skin Concerns", question: "What are your main skin concerns?", name: "concerns", options: ["Acne", "Wrinkles/Fine Lines", "Dark Spots", "Redness", "Dullness", "Uneven Texture"], type: "radio", required: true },
        { label: "Sensitivity Level", question: "How sensitive is your skin to new products?", name: "sensitivity_level", options: ["Very sensitive", "Slightly sensitive", "Not sensitive"], type: "radio", required: true },
        { label: "Breakout Frequency", question: "How often do you experience breakouts?", name: "breakout_frequency", options: ["Frequently", "Occasionally", "Rarely", "Never"], type: "radio", required: true },
        { label: "Known Allergies", question: "Do you have any known skin allergies or product sensitivities?", name: "allergies", options: ["Yes", "No"], type: "radio", required: true },
        { label: "Routine Time", question: "How much time do you typically spend on your skincare routine?", name: "time_spent", options: ["<5 mins", "5-10 mins", "10-20 mins", "20+ mins"], type: "radio", required: true },
        { label: "Product Preferences", question: "What type of skincare products are you looking for?", name: "product_preferences", options: ["Cleanser", "Moisturizer", "Serum", "Sunscreen", "Toner", "Exfoliant", "Mask", "Eye Cream"], type: "checkbox" },
        { label: "Importance of Natural/Organic", question: "How important is it to you that products are natural or organic?", name: "natural_importance", options: ["Natural", "Organic", "Not important"], type: "radio", required: true },
        { label: "Fragrance-Free Preference", question: "Are you interested in fragrance-free products?", name: "fragrance_free", options: ["Yes", "No"], type: "radio", required: true },
        { label: "Age Range", question: "What is your age range?", name: "age_range", options: ["Under 18", "18-25", "26-35", "36-45", "46-55", "56+"], type: "radio", required: true },
        { label: "Budget Preference", question: "How much are you willing to spend on skincare products?", name: "budget_preference", options: ["Budget-Friendly", "Mid-Range", "High-End/Luxury"], type: "radio", required: true }
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setQuizData({ ...quizData, [name]: value });
    };

    const handleCheckboxChange = (e) => {
        const { name, value, checked } = e.target;
        setQuizData((prevData) => ({
            ...prevData,
            [name]: checked ? [...prevData[name], value] : prevData[name].filter((item) => item !== value),
        }));
    };

    const handleSubmit = async () => {
        try {
            if (isQuizFilled) {
                await axios.put('/api/skin-quiz', quizData);
            } else {
                await axios.post('/api/skin-quiz', quizData);
            }
            setSubmitted(true);
            setTimeout(() => {
                setSubmitted(false);
                setEditMode(false);
                setIsQuizFilled(true);
            }, 3000);
        } catch (error) {
            console.error("Error submitting or updating quiz:", error);
            alert("There was an error submitting the quiz. Please try again.");
        }
    };

    const handleNext = () => {
        if (step < questions.length - 1) setStep(step + 1);
    };

    const handlePrev = () => {
        if (step > 0) setStep(step - 1);
    };

    if (submitted) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                <Typography variant="h4" sx={{ color: '#38b593', fontWeight: 'bold', textAlign: 'center' }}>
                    Thank you for updating your quiz!
                </Typography>
            </Box>
        );
    }

    const SummaryItem = ({ label, value }) => (
        <Box
            sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "0.5rem",
                padding: "0 1rem",
                boxShadow: "0 2px 11.9px rgba(0, 0, 0, 0.25)",
                backgroundColor: theme.palette.mode === "dark" ? "transparent" : "#F9F9F9",
                borderRadius: "6px",
                border: "1px solid",
                borderColor: theme.palette.mode === "dark" ? "#C5C5C5" : "transparent",
            }}
        >
            <Typography sx={{ fontWeight: "bold", color: theme.palette.mode === "dark" ? "#C5C5C5" : "#212121", fontSize: "1.4rem" }}>
                {label}
            </Typography>
            <Typography>{value}</Typography>
        </Box>
    );

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="flex-start"
            minHeight="100vh"
            flexDirection="row"
            sx={{ padding: "3rem", gap: 4 }}
        >
            <Box sx={{ width: isQuizFilled ? "80%" : "100%" }}>
                <Card
                    sx={{
                        borderRadius: "24px",
                        padding: "3rem",
                        backgroundColor: theme.palette.mode === 'light' ? '#fff' : 'transparent',
                        color: theme.palette.mode === "light" ? '#212121' : '#fff',
                        boxShadow: theme.palette.mode === 'light' ? "0px 4px 12px rgba(0, 0, 0, 0.1)" : "none",
                    }}
                >
                    <CardContent sx={{ textAlign: 'left' }}>
                        <Typography sx={{ fontSize: "2.2rem", fontWeight: 'bold', color: '#38b593', mb: 2 }}>
                            {isQuizFilled ? (editMode ? questions[step].label : "Your Selected Answers") : questions[step].label}
                        </Typography>
                        {isQuizFilled && !editMode ? (
                            <Grid container spacing={2}>
                                {questions.map((question, index) => (
                                    <Grid item xs={12} sm={6} key={index}>
                                        <SummaryItem
                                            label={question.label}
                                            value={Array.isArray(quizData[question.name])
                                                ? quizData[question.name].join(', ')
                                                : quizData[question.name] || "---"}
                                        />
                                    </Grid>
                                ))}
                            </Grid>
                        ) : (
                            <Box sx={{ textAlign: "flex-start" }}>
                                <Typography sx={{ fontSize: "2rem", fontWeight: 'bold', mb: 2 }}>{questions[step].question}</Typography>
                                <FormControl component="fieldset" fullWidth>
                                    {questions[step].type === "radio" ? (
                                        <RadioGroup
                                            name={questions[step].name}
                                            value={quizData[questions[step].name]}
                                            onChange={handleChange}
                                        >
                                            {questions[step].options.map((option) => (
                                                <FormControlLabel key={option} value={option} control={<Radio />} label={option} sx={{ mb: 1, fontSize: "1.4rem" }} />
                                            ))}
                                        </RadioGroup>
                                    ) : (
                                        questions[step].options.map((option) => (
                                            <FormControlLabel
                                                key={option}
                                                control={
                                                    <Checkbox
                                                        checked={quizData[questions[step].name].includes(option)}
                                                        onChange={handleCheckboxChange}
                                                        name={questions[step].name}
                                                        value={option}
                                                    />
                                                }
                                                label={option}
                                                sx={{ mb: 1, fontSize: "1.4rem" }}
                                            />
                                        ))
                                    )}
                                </FormControl>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                                    <Button onClick={handlePrev} disabled={step === 0} variant="outlined">
                                        Previous
                                    </Button>
                                    {step === questions.length - 1 ? (
                                        <Button onClick={handleSubmit} variant="contained" sx={{ backgroundColor: '#80e7b1' }}>
                                            {isQuizFilled ? "Update Answers" : "Submit Quiz"}
                                        </Button>
                                    ) : (
                                        <Button onClick={handleNext} variant="contained" sx={{ backgroundColor: '#80e7b1' }}>
                                            Next
                                        </Button>
                                    )}
                                </Box>
                            </Box>
                        )}
                    </CardContent>
                </Card>
            </Box>
            {isQuizFilled && !editMode && (
                <Card
                    sx={{
                        borderRadius: "24px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: "2rem",
                        width: "20%",
                        backgroundColor: theme.palette.mode === 'light' ? '#fff' : 'transparent',
                        color: theme.palette.mode === "light" ? '#212121' : '#fff',
                        boxShadow: theme.palette.mode === 'light' ? "0px 4px 12px rgba(0, 0, 0, 0.1)" : "none",
                    }}
                >
                    <Typography sx={{ fontSize: "2rem", fontWeight: 'bold', color: '#333', mb: 2, textAlign: 'center' }}>Want to update your answers?</Typography>
                    <Typography sx={{ color: '#555', mb: 2, textAlign: 'center' }}>Review and update your quiz responses anytime to get the most accurate recommendations for your skincare needs.</Typography>
                    <Button onClick={() => { setEditMode(true); setStep(0); }} variant="contained" sx={{ backgroundColor: '#80e7b1' }}>
                        Update Answers
                    </Button>
                </Card>
            )}
        </Box>
    );
};

export default SkinQuiz;
