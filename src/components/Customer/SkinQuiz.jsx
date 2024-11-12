//"Vibe check! 💅 Is your skincare routine really matching your energy? Answer a few questions and level up your glow."//
import React, { useState } from 'react';
import { Box, Typography, Button, TextField, FormControl, RadioGroup, FormControlLabel, Radio, Checkbox, Card, CardContent } from '@mui/material';
import { motion } from 'framer-motion';

const SkinQuiz = () => {
    const [quizData, setQuizData] = useState({
        skinType: '',
        concerns: '',
        hydration: '',
        sensitivity: '',
        breakouts: '',
        allergies: '',
        skincareRoutine: '',
        productType: [],
        naturalPreference: '',
        fragranceFree: '',
        budget: '',
        allergyDetails: '',
    });
    const [submitted, setSubmitted] = useState(false);
    const [step, setStep] = useState(0);

    const questions = [
        {
            label: "What is your skin type?",
            name: "skinType",
            options: ["Oily", "Dry", "Normal", "Combination", "Sensitive"],
            type: "radio",
            required: true,
        },
        {
            label: "What are your main skin concerns? (e.g., acne, dryness)",
            name: "concerns",
            type: "text",
        },
        {
            label: "How sensitive is your skin to new products?",
            name: "sensitivity",
            options: ["Very sensitive", "Slightly sensitive", "Not sensitive"],
            type: "radio",
            required: true,
        },
        {
            label: "How often do you experience breakouts?",
            name: "breakouts",
            options: ["Frequently", "Occasionally", "Rarely", "Never"],
            type: "radio",
            required: true,
        },
        {
            label: "Do you have any known skin allergies or product sensitivities?",
            name: "allergies",
            options: ["Yes", "No"],
            type: "radio",
            required: true,
            hasTextBox: true,
        },
        {
            label: "How much time do you typically spend on your skincare routine?",
            name: "skincareRoutine",
            options: ["Less than 5 minutes", "5-10 minutes", "10-20 minutes", "20+ minutes"],
            type: "radio",
            required: true,
        },
        {
            label: "What type of skincare products are you looking for?",
            name: "productType",
            options: ["Cleanser", "Moisturizer", "Serum", "Sunscreen", "Toner", "Exfoliant", "Mask", "Eye Cream"],
            type: "checkbox",
        },
        {
            label: "How important is it to you that products are natural or organic?",
            name: "naturalPreference",
            options: ["Very important", "Somewhat important", "Not important"],
            type: "radio",
            required: true,
        },
        {
            label: "Are you interested in fragrance-free products?",
            name: "fragranceFree",
            options: ["Yes", "No", "Indifferent"],
            type: "radio",
            required: true,
        },
        {
            label: "How much are you willing to spend on skincare products?",
            name: "budget",
            options: ["Budget-Friendly", "Mid-Range", "High-End/Luxury"],
            type: "radio",
            required: true,
        },
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setQuizData({
            ...quizData,
            [name]: value,
        });
    };

    const handleCheckboxChange = (e) => {
        const { name, value, checked } = e.target;
        setQuizData((prevData) => ({
            ...prevData,
            [name]: checked
                ? [...prevData[name], value]
                : prevData[name].filter((item) => item !== value),
        }));
    };

    const handleNext = () => {
        if (questions[step].required && !quizData[questions[step].name]) {
            alert("Please select an option to continue!");
            return;
        }
        setStep((prevStep) => prevStep + 1);
    };

    const handlePrev = () => {
        setStep((prevStep) => prevStep - 1);
    };

    const handleSubmit = () => {
        setSubmitted(true);
    };

    if (submitted) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                <Typography variant="h4" sx={{ color: '#38b593', fontWeight: 'bold', textAlign: 'center' }}>Thank you for completing the quiz!</Typography>
            </Box>
        );
    }

    const currentQuestion = questions[step];

    return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" flexDirection="column" sx={{ p: 3, mt: -5 }}>
            {/* Full-Width Black Line */}
            <Box sx={{
                width: '100vw',
                position: 'fixed',
                top: 0,
                left: 0,
                background: '#000',
                color: '#fff',
                py: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1000,
            }}>
                <motion.div
                    animate={{ x: ['100%', '-100%'] }}
                    transition={{
                        repeat: Infinity,
                        duration: 10,
                        ease: 'linear',
                    }}
                    style={{ display: 'inline-block', fontSize: '1.1rem', fontWeight: 'bold' }}
                >
                    Vibe check! 💅 Is your skincare routine really matching your energy? Answer a few questions and level up your glow.
                </motion.div>
            </Box>

            {/* Animated Card */}
            <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
                style={{
                    boxShadow: '0px 15px 25px rgba(0, 0, 0, 0.2)',
                    borderRadius: '20px',
                    width: '100%',
                    maxWidth: 700,
                }}
            >
                <Card sx={{ borderRadius: '20px', p: 3, backgroundColor: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(10px)' }}>
                    <CardContent sx={{ textAlign: 'left' }}>
                        <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#38b593', mb: 2 }}>Skin Quiz</Typography>
                        <Typography variant="body1" sx={{ fontSize: '1.35rem', color: '#333', mb: 3 }}>{currentQuestion.label}</Typography>

                        {currentQuestion.type === "radio" && (
                            <FormControl component="fieldset" fullWidth>
                                <RadioGroup
                                    name={currentQuestion.name}
                                    value={quizData[currentQuestion.name]}
                                    onChange={handleChange}
                                >
                                    {currentQuestion.options.map((option) => (
                                        <FormControlLabel key={option} value={option.toLowerCase()} control={<Radio />} label={option} sx={{ color: '#333', marginBottom: 1 }} />
                                    ))}
                                </RadioGroup>
                            </FormControl>
                        )}

                        {currentQuestion.type === "text" && (
                            <TextField
                                name={currentQuestion.name}
                                value={quizData[currentQuestion.name]}
                                onChange={handleChange}
                                fullWidth
                                multiline
                                rows={2}
                                sx={{ mt: 2, backgroundColor: '#f0f0f0', borderRadius: '8px' }}
                            />
                        )}

                        {currentQuestion.type === "checkbox" && (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
                                {currentQuestion.options.map((option) => (
                                    <FormControlLabel
                                        key={option}
                                        control={
                                            <Checkbox
                                                checked={quizData[currentQuestion.name].includes(option)}
                                                onChange={handleCheckboxChange}
                                                name={currentQuestion.name}
                                                value={option}
                                                sx={{ color: '#38b593' }}
                                            />
                                        }
                                        label={option}
                                        sx={{ color: '#333', width: '50%' }}
                                    />
                                ))}
                            </Box>
                        )}

                        {currentQuestion.hasTextBox && quizData.allergies === 'yes' && (
                            <TextField
                                label="Please specify"
                                name="allergyDetails"
                                value={quizData.allergyDetails || ''}
                                onChange={handleChange}
                                fullWidth
                                sx={{ mt: 1, backgroundColor: '#f0f0f0', borderRadius: '8px' }}
                            />
                        )}

                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                            <Button
                                variant="outlined"
                                onClick={handlePrev}
                                disabled={step === 0}
                                sx={{
                                    color: '#38b593',
                                    borderColor: '#38b593',
                                    '&:hover': { backgroundColor: '#38b593', color: '#fff' },
                                }}
                            >
                                Previous
                            </Button>
                            {step === questions.length - 1 ? (
                                <Button
                                    variant="contained"
                                    onClick={handleSubmit}
                                    sx={{
                                        backgroundColor: '#80e7b1',
                                        '&:hover': { backgroundColor: '#4a9c50' },
                                    }}
                                >
                                    Submit
                                </Button>
                            ) : (
                                <Button
                                    variant="contained"
                                    onClick={handleNext}
                                    sx={{
                                        backgroundColor: '#80e7b1',
                                        '&:hover': { backgroundColor: '#40ff6d' },
                                    }}
                                >
                                    Next
                                </Button>
                            )}
                        </Box>
                    </CardContent>
                </Card>
            </motion.div>
        </Box>
    );
};

export default SkinQuiz;
