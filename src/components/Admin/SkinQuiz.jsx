"use client";

import React, { useState, useEffect } from 'react';
import {
    Box,
    CircularProgress,
    Paper,
    Table,
    TableBody,
    TableHead,
    TableRow,
    Divider,
    Tooltip,
} from '@mui/material';
import {
    StyledTable,
    TableRowCustom,
    TableHeaderCell,
    TableCellCustom,
    SectionHeading,
} from '../mui/AdminPkgs';

export default function SkinQuizEntries() {
    const [skinQuizEntries, setSkinQuizEntries] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchSkinQuizEntries() {
            try {
                const response = await fetch('/api/admin/skin-quiz', { method: 'GET' });
                const data = await response.json();
                setSkinQuizEntries(data.skinQuizEntries || []);
            } catch (error) {
                console.error('Error fetching skin quiz entries:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchSkinQuizEntries();
    }, []);

    return (
        <Box sx={{ padding: '3rem', marginTop: "3rem" }}>
            <SectionHeading>Skin Quiz Entries</SectionHeading>
            <Divider sx={{ mb: 4 }} />
            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                    <CircularProgress />
                </Box>
            ) : (
                <StyledTable component={Paper}>
                    <Table stickyHeader>
                        <TableHead>
                            <TableRowCustom>
                                <TableHeaderCell>ID</TableHeaderCell>
                                <TableHeaderCell>User ID</TableHeaderCell>
                                <TableHeaderCell>Created At</TableHeaderCell>
                                <TableHeaderCell>Skin Type</TableHeaderCell>
                                <TableHeaderCell>Sensitivity Level</TableHeaderCell>
                                <TableHeaderCell>Breakout Frequency</TableHeaderCell>
                                <TableHeaderCell>Allergies</TableHeaderCell>
                                <TableHeaderCell>Time Spent</TableHeaderCell>
                                <TableHeaderCell>Product Preferences</TableHeaderCell>
                                <TableHeaderCell>Natural Importance</TableHeaderCell>
                                <TableHeaderCell>Fragrance-Free</TableHeaderCell>
                                <TableHeaderCell>Budget Preference</TableHeaderCell>
                                <TableHeaderCell>Age Range</TableHeaderCell>
                                <TableHeaderCell>Concerns</TableHeaderCell>
                            </TableRowCustom>
                        </TableHead>
                        <TableBody>
                            {skinQuizEntries.map((entry) => (
                                <TableRowCustom key={entry.id}>
                                    <TableCellCustom>{entry.id}</TableCellCustom>
                                    <TableCellCustom>{entry.user_id}</TableCellCustom>
                                    <TableCellCustom>{new Date(entry.created_at).toLocaleDateString()}</TableCellCustom>
                                    <TableCellCustom>{entry.skin_type}</TableCellCustom>
                                    <TableCellCustom>{entry.sensitivity_level}</TableCellCustom>
                                    <TableCellCustom>{entry.breakout_frequency}</TableCellCustom>
                                    <TableCellCustom>{entry.allergies || 'None'}</TableCellCustom>
                                    <TableCellCustom>{entry.time_spent}</TableCellCustom>
                                    <TableCellCustom>{entry.product_preferences || 'Not specified'}</TableCellCustom>
                                    <TableCellCustom>{entry.natural_importance}</TableCellCustom>
                                    <TableCellCustom>{entry.fragrance_free ? 'Yes' : 'No'}</TableCellCustom>
                                    <TableCellCustom>{entry.budget_preference}</TableCellCustom>
                                    <TableCellCustom>{entry.age_range}</TableCellCustom>
                                    <TableCellCustom>{entry.concerns || 'None'}</TableCellCustom>
                                </TableRowCustom>
                            ))}
                        </TableBody>
                    </Table>
                </StyledTable>
            )}
        </Box>
    );
}
