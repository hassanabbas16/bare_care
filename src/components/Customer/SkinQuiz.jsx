import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, FormControl, RadioGroup, FormControlLabel, Radio, Checkbox, Card, CardContent, Grid } from '@mui/material';
import axios from 'axios';

const SkinQuiz = () => {
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
    const [step, setStep] = useState(0); // Controls the step-by-step navigation
    const [editMode, setEditMode] = useState(false); // Controls edit mode

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
        { label: "What is your skin type?", name: "skin_type", options: ["Oily", "Dry", "Normal", "Combination", "Sensitive"], type: "radio", required: true },
        { label: "What are your main skin concerns?", name: "concerns", options: ["Acne", "Wrinkles/Fine Lines", "Dark Spots", "Redness", "Dullness", "Uneven Texture"], type: "radio", required: true },
        { label: "How sensitive is your skin to new products?", name: "sensitivity_level", options: ["Very sensitive", "Slightly sensitive", "Not sensitive"], type: "radio", required: true },
        { label: "How often do you experience breakouts?", name: "breakout_frequency", options: ["Frequently", "Occasionally", "Rarely", "Never"], type: "radio", required: true },
        { label: "Do you have any known skin allergies or product sensitivities?", name: "allergies", options: ["Yes", "No"], type: "radio", required: true, hasTextBox: true },
        { label: "How much time do you typically spend on your skincare routine?", name: "time_spent", options: ["<5 mins", "5-10 mins", "10-20 mins", "20+ mins"], type: "radio", required: true },
        { label: "What type of skincare products are you looking for?", name: "product_preferences", options: ["Cleanser", "Moisturizer", "Serum", "Sunscreen", "Toner", "Exfoliant", "Mask", "Eye Cream"], type: "checkbox" },
        { label: "How important is it to you that products are natural or organic?", name: "natural_importance", options: ["Natural", "Organic", "Not important"], type: "radio", required: true },
        { label: "Are you interested in fragrance-free products?", name: "fragrance_free", options: ["Yes", "No"], type: "radio", required: true },
        { label: "What is your age range?", name: "age_range", options: ["Under 18", "18-25", "26-35", "36-45", "46-55", "56+"], type: "radio", required: true },
        { label: "How much are you willing to spend on skincare products?", name: "budget_preference", options: ["Budget-Friendly", "Mid-Range", "High-End/Luxury"], type: "radio", required: true }
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

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="flex-start"
            minHeight="100vh"
            flexDirection="row"
            sx={{ p: 3, gap: 4 }}
        >
            <Card sx={{ borderRadius: '20px', p: 3, width: '70%' }}>
                <CardContent sx={{ textAlign: 'left' }}>
                    <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#38b593', mb: 2 }}>
                        {isQuizFilled ? (editMode ? "Update Your Quiz Answers" : "Your Selected Answers") : "Complete the Skin Quiz"}
                    </Typography>
                    {isQuizFilled && !editMode ? (
                        questions.map((question, index) => (
                            <Box key={index} sx={{ mb: 3 }}>
                                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333' }}>{question.label}</Typography>
                                <Typography variant="body1" sx={{ color: '#555' }}>
                                    {Array.isArray(quizData[question.name])
                                        ? quizData[question.name].join(', ')
                                        : quizData[question.name]}
                                </Typography>
                            </Box>
                        ))
                    ) : (
                        <Box>
                            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333' }}>{questions[step].label}</Typography>
                            <FormControl component="fieldset" fullWidth>
                                {questions[step].type === "radio" ? (
                                    <RadioGroup
                                        name={questions[step].name}
                                        value={quizData[questions[step].name]}
                                        onChange={handleChange}
                                    >
                                        {questions[step].options.map((option) => (
                                            <FormControlLabel key={option} value={option} control={<Radio />} label={option} sx={{ color: '#333', mb: 1 }} />
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
                                                    sx={{ color: '#38b593' }}
                                                />
                                            }
                                            label={option}
                                            sx={{ color: '#333', width: '50%' }}
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
            {isQuizFilled && !editMode && (
                <Card sx={{ borderRadius: '20px', p: 3, width: '20%' }}>
                    <CardContent sx={{ textAlign: 'center' }}>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333', mb: 2 }}>Want to update your answers?</Typography>
                        <Button onClick={() => { setEditMode(true); setStep(0); }} variant="contained" sx={{ backgroundColor: '#80e7b1' }}>
                            Update Answers
                        </Button>
                    </CardContent>
                </Card>
            )}
        </Box>
    );
};

export default SkinQuiz;
