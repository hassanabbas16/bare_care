// src/components/PollModal.jsx
import React, { useState } from "react";
import {
    IconButton,
    Modal,
    Box,
    Typography,
    Button,
    CircularProgress,
    LinearProgress,
} from "@mui/material";
import PollIcon from "@mui/icons-material/Poll";
import CloseIcon from "@mui/icons-material/Close";

const PollModal = () => {
    const [open, setOpen] = useState(false);
    const [voted, setVoted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [votes, setVotes] = useState({
        option1: 30,
        option2: 50,
        option3: 20,
    });

    const totalVotes = Object.values(votes).reduce((a, b) => a + b, 0);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleVote = (option) => {
        setLoading(true);
        setTimeout(() => {
            setVotes((prevVotes) => ({
                ...prevVotes,
                [option]: prevVotes[option] + 1,
            }));
            setVoted(true);
            setLoading(false);
        }, 500); // Simulate network delay
    };

    return (
        <>
            {/* Floating Icon Button */}
            <IconButton
                onClick={handleOpen}
                sx={{
                    position: "fixed",
                    bottom: 32,
                    right: 32,
                    width: "10rem",
                    height: "10rem",
                    backgroundColor: "primary.main",
                    color: "primary.contrastText",
                    "&:hover": { backgroundColor: "primary.dark" },
                    zIndex: 1000,
                }}
            >
                <PollIcon sx={{ fontSize: "4.4rem" }} />
            </IconButton>

            {/* Modal */}
            <Modal open={open} onClose={handleClose}>
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: "40%",
                        bgcolor: "background.paper",
                        boxShadow: 24,
                        p: 4,
                        borderRadius: 2,
                    }}
                >
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Typography sx={{fontSize: "3rem", color: "#000"}}>Vote Your Preference</Typography>
                        <IconButton onClick={handleClose}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                    <Typography color="text.secondary" sx={{ mb: 2, fontSize:"2.4rem" }}>
                        Please select an option below:
                    </Typography>

                    {voted ? (
                        <>
                            {Object.entries(votes).map(([option, count]) => (
                                <Box key={option} sx={{ my: 1 }}>
                                    <Typography sx={{fontSize:"2rem", color: "#000"}}>
                                        {option} ({Math.round((count / totalVotes) * 100)}%)
                                    </Typography>
                                    <LinearProgress
                                        variant="determinate"
                                        value={(count / totalVotes) * 100}
                                        sx={{ height: 20, borderRadius: 1, mt: 0.5 }}
                                    />
                                </Box>
                            ))}
                            <Typography color="text.secondary" sx={{ mt: 2, fontSize:"2.4rem" }}>
                                Total Votes: {totalVotes}
                            </Typography>
                        </>
                    ) : (
                        <>
                            {loading ? (
                                <Box display="flex" justifyContent="center" my={2}>
                                    <CircularProgress />
                                </Box>
                            ) : (
                                ["Option 1", "Option 2", "Option 3"].map((option, index) => (
                                    <Button
                                        key={option}
                                        variant="outlined"
                                        fullWidth
                                        sx={{ mb: 1, textTransform: "none", fontSize:"2.4rem" }}
                                        onClick={() => handleVote(`option${index + 1}`)}
                                    >
                                        {option}
                                    </Button>
                                ))
                            )}
                        </>
                    )}
                </Box>
            </Modal>
        </>
    );
};

export default PollModal;
