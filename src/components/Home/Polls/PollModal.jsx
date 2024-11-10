// components/PollModal.jsx
'use client';

import React, { useEffect, useState } from 'react';
import {
    IconButton,
    Modal,
    Box,
    Typography,
    Button,
    LinearProgress,
    Stack,
} from '@mui/material';
import PollIcon from '@mui/icons-material/Poll';
import CloseIcon from '@mui/icons-material/Close';

const PollModal = () => {
    const [open, setOpen] = useState(false);
    const [poll, setPoll] = useState(null);
    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [voted, setVoted] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [voteLoading, setVoteLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // Fetch poll data
    const fetchPoll = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await fetch('/api/polls', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`Error fetching poll: ${response.statusText}`);
            }

            const data = await response.json();

            if (data.poll) {
                setPoll(data.poll);
                setOptions(data.options);
                // Check if user has voted using localStorage
                const votedPolls = JSON.parse(localStorage.getItem('votedPolls') || '[]');
                if (votedPolls.includes(data.poll.id)) {
                    setVoted(true);
                }
            }
        } catch (error) {
            console.error(error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPoll();
        // Open the modal when the component mounts
        setOpen(true);
    }, []);

    // Calculate total votes
    const totalVotes = options.reduce((acc, curr) => acc + curr.votes, 0);

    const handleVote = async () => {
        if (!selectedOption) return;

        try {
            setVoteLoading(true);
            setError(null);
            const response = await fetch(`/api/polls/${poll.id}/vote`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ optionId: selectedOption }),
            });

            const data = await response.json();

            if (response.ok && data.message) {
                // Update local state
                const updatedOptions = options.map((option) =>
                    option.id === selectedOption
                        ? { ...option, votes: option.votes + 1 }
                        : option
                );
                setOptions(updatedOptions);
                setVoted(true);
                // Store in localStorage
                const votedPolls = JSON.parse(localStorage.getItem('votedPolls') || '[]');
                votedPolls.push(poll.id);
                localStorage.setItem('votedPolls', JSON.stringify(votedPolls));
            } else {
                throw new Error(data.error || 'Failed to record vote.');
            }
        } catch (error) {
            console.error('Error voting:', error);
            setError(error.message);
        } finally {
            setVoteLoading(false);
        }
    };

    return (
        <>
            {/* Floating Icon Button */}
            <IconButton
                onClick={handleOpen}
                sx={{
                    position: 'fixed',
                    bottom: 32,
                    right: 32,
                    width: '6rem',
                    height: '6rem',
                    backgroundColor: 'primary.main',
                    color: 'primary.contrastText',
                    '&:hover': { backgroundColor: 'primary.dark' },
                    boxShadow: 6,
                    zIndex: 1000,
                }}
                aria-label="Open Poll"
            >
                <PollIcon sx={{ fontSize: '2.5rem' }} />
            </IconButton>

            {/* Dynamic Modal */}
            <Modal open={open} onClose={handleClose} aria-labelledby="poll-modal-title" aria-describedby="poll-modal-description">
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: { xs: '90%', sm: '80%', md: '50%', lg: '40%' },
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                        borderRadius: 2,
                        maxHeight: '90vh',
                        overflowY: 'auto',
                        outline: 'none',
                    }}
                >
                    {loading ? (
                        <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                            <Typography sx={{ fontSize: '1.8rem', color: 'text.secondary' }}>Loading...</Typography>
                        </Box>
                    ) : poll ? (
                        <>
                            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                                <Typography id="poll-modal-title" sx={{ fontSize: '2.4rem', fontWeight: 'bold', color: 'text.primary' }}>
                                    {poll.question}
                                </Typography>
                                <IconButton onClick={handleClose} aria-label="Close Poll">
                                    <CloseIcon />
                                </IconButton>
                            </Box>

                            {voted ? (
                                <>
                                    <Typography color="text.secondary" sx={{ mb: 2, fontSize: '1.6rem' }}>
                                        Poll Results:
                                    </Typography>

                                    <Stack spacing={2} mb={2}>
                                        {options.map((option) => {
                                            const percentage = totalVotes === 0 ? 0 : ((option.votes / totalVotes) * 100).toFixed(1);
                                            return (
                                                <Box key={option.id}>
                                                    <Typography sx={{ fontSize: '1.6rem', color: 'text.primary' }}>
                                                        {option.option_text} ({percentage}%)
                                                    </Typography>
                                                    <LinearProgress
                                                        variant="determinate"
                                                        value={Number(percentage)}
                                                        sx={{ height: 10, borderRadius: 5, backgroundColor: '#e0e0e0' }}
                                                    />
                                                </Box>
                                            );
                                        })}
                                    </Stack>

                                    <Typography color="text.secondary" sx={{ fontSize: '1.6rem' }}>
                                        Total Votes: {totalVotes}
                                    </Typography>
                                </>
                            ) : (
                                <>
                                    <Typography color="text.secondary" sx={{ mb: 2, fontSize: '1.6rem' }}>
                                        Cast Your Vote:
                                    </Typography>
                                    <Stack spacing={2} mb={2}>
                                        {options.map((option) => (
                                            <Button
                                                key={option.id}
                                                variant={selectedOption === option.id ? 'contained' : 'outlined'}
                                                color="primary"
                                                fullWidth
                                                sx={{
                                                    textTransform: 'none',
                                                    fontSize: '1.4rem',
                                                    borderRadius: 2,
                                                }}
                                                onClick={() => setSelectedOption(option.id)}
                                            >
                                                {option.option_text}
                                            </Button>
                                        ))}
                                    </Stack>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        fullWidth
                                        sx={{
                                            textTransform: 'none',
                                            fontSize: '1.4rem',
                                            borderRadius: 2,
                                        }}
                                        onClick={handleVote}
                                        disabled={!selectedOption || voteLoading}
                                    >
                                        {voteLoading ? 'Submitting...' : 'Vote'}
                                    </Button>
                                </>
                            )}

                            {error && (
                                <Typography color="error" sx={{ mt: 2, fontSize: '1.4rem', textAlign: 'center' }}>
                                    {error}
                                </Typography>
                            )}
                        </>
                    ) : (
                        <Typography sx={{ fontSize: '1.8rem', textAlign: 'center', color: 'text.secondary' }}>
                            No active polls.
                        </Typography>
                    )}
                </Box>
            </Modal>
        </>
    );

};

export default PollModal;
