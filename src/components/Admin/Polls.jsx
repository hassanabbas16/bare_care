"use client";

import React, { useState, useEffect } from 'react';
import {
    Box,
    CircularProgress,
    Button,
    Typography,
    Paper,
    Table,
    TableBody,
    TableHead,
    TableRow,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
} from '@mui/material';
import {
    StyledTable,
    TableRowCustom,
    TableHeaderCell,
    TableCellCustom,
    SectionHeading,
    ModalCard,
    ModalButton,
    ModalContentBox,
    ModalLabel,
    ModalValue,
} from '../mui/AdminPkgs';

export default function PollManagement() {
    const [polls, setPolls] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openDialog, setOpenDialog] = useState(false);
    const [newPoll, setNewPoll] = useState({ question: '', display_date: '', options: [] });
    const [newOption, setNewOption] = useState('');
    const [currentPoll, setCurrentPoll] = useState(null);

    useEffect(() => {
        async function fetchPolls() {
            try {
                const response = await fetch('/api/admin/polls', { method: 'GET' });
                const data = await response.json();
                setPolls(data || []);

                const today = new Date().toISOString().split('T')[0];
                const runningPoll = data.find((poll) => poll.display_date === today);
                setCurrentPoll(runningPoll || null);
            } catch (error) {
                console.error('Error fetching polls:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchPolls();
    }, []);

    const handleAddOption = () => {
        if (!newOption.trim()) return;
        setNewPoll((prev) => ({
            ...prev,
            options: [...prev.options, newOption],
        }));
        setNewOption('');
    };

    const handleCreatePoll = async () => {
        try {
            const response = await fetch('/api/admin/polls', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newPoll),
            });

            if (response.ok) {
                const createdPoll = await response.json();
                setPolls((prev) => [createdPoll, ...prev]);
                setOpenDialog(false);
                setNewPoll({ question: '', display_date: '', options: [] });
            } else {
                const errorData = await response.json();
                console.error('Error creating poll:', errorData.error);
            }
        } catch (error) {
            console.error('Error creating poll:', error);
        }
    };

    return (
        <Box sx={{ padding: '3rem', marginTop: "3rem" }}>
            <SectionHeading>Poll Management</SectionHeading>
            <Button
                variant="contained"
                color="primary"
                sx={{ mb: 3 }}
                onClick={() => setOpenDialog(true)}
            >
                Add New Poll
            </Button>
            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                    <CircularProgress />
                </Box>
            ) : (
                <StyledTable component={Paper}>
                    <Table stickyHeader>
                        <TableHead>
                            <TableRowCustom>
                                <TableHeaderCell>Question</TableHeaderCell>
                                <TableHeaderCell>Display Date</TableHeaderCell>
                                <TableHeaderCell>Options</TableHeaderCell>
                                <TableHeaderCell>Total Votes</TableHeaderCell>
                            </TableRowCustom>
                        </TableHead>
                        <TableBody>
                            {polls.map((poll) => (
                                <TableRowCustom key={poll.id}>
                                    <TableCellCustom>{poll.question}</TableCellCustom>
                                    <TableCellCustom>{poll.display_date}</TableCellCustom>
                                    <TableCellCustom>
                                        {poll.poll_options.map((option) => (
                                            <Typography key={option.id}>
                                                {option.option_text} - {option.votes} votes
                                            </Typography>
                                        ))}
                                    </TableCellCustom>
                                    <TableCellCustom>
                                        {poll.poll_options.reduce((total, option) => total + option.votes, 0)}
                                    </TableCellCustom>
                                </TableRowCustom>
                            ))}
                        </TableBody>
                    </Table>
                </StyledTable>
            )}

            {currentPoll && (
                <Box sx={{ mt: 4 }}>
                    <SectionHeading>Current Poll</SectionHeading>
                    <ModalCard>
                        <Typography sx={{fontSize: "1.6rem", marginBottom: "1rem"}}>{currentPoll.question}</Typography>
                        <Box>
                            {currentPoll.poll_options.map((option) => (
                                <ModalContentBox key={option.id}>
                                    <ModalLabel>{option.option_text}</ModalLabel>
                                    <ModalValue>{option.votes} votes</ModalValue>
                                </ModalContentBox>
                            ))}
                        </Box>
                    </ModalCard>
                </Box>
            )}

            <Dialog open={openDialog} onClose={() => setOpenDialog(false)} fullWidth>
                <DialogTitle>Add New Poll</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Question"
                        variant="outlined"
                        fullWidth
                        sx={{ mb: 2 }}
                        value={newPoll.question}
                        onChange={(e) =>
                            setNewPoll((prev) => ({ ...prev, question: e.target.value }))
                        }
                    />
                    <TextField
                        label="Display Date"
                        type="date"
                        variant="outlined"
                        fullWidth
                        sx={{ mb: 2 }}
                        value={newPoll.display_date}
                        onChange={(e) =>
                            setNewPoll((prev) => ({ ...prev, display_date: e.target.value }))
                        }
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <TextField
                            label="Option"
                            variant="outlined"
                            fullWidth
                            value={newOption}
                            onChange={(e) => setNewOption(e.target.value)}
                        />
                        <Button onClick={handleAddOption} sx={{ ml: 2 }}>
                            Add
                        </Button>
                    </Box>
                    <Box>
                        {newPoll.options.map((option, index) => (
                            <Typography key={index} variant="body2">
                                {option}
                            </Typography>
                        ))}
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
                    <ModalButton onClick={handleCreatePoll}>Create</ModalButton>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
