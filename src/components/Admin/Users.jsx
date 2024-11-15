"use client";

import React, { useState, useEffect } from 'react';
import {
    Box,
    CircularProgress,
    Select,
    MenuItem,
    IconButton,
    Table,
    TableHead,
    TableBody,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import {
    StyledTable,
    TableRowCustom,
    TableHeaderCell,
    TableCellCustom,
    StyledTablePagination,
    SectionHeading,
} from '../mui/AdminPkgs'; // Importing styled components

export default function UserManagement() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    useEffect(() => {
        async function fetchUsers() {
            try {
                const response = await fetch('/api/users', { method: 'GET' });
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.error('Error fetching users:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchUsers();
    }, []);

    const handleDeleteUser = async (userId) => {
        if (!confirm('Are you sure you want to delete this user?')) return;

        try {
            const deleteResponse = await fetch(`/api/users?id=${userId}`, {
                method: 'DELETE',
            });

            if (deleteResponse.ok) {
                setUsers(users.filter((user) => user.id !== userId));
            } else {
                const errorData = await deleteResponse.json();
                console.error('Failed to delete user:', errorData.error);
            }
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const handleRoleChange = async (userId, newRole) => {
        try {
            const updateResponse = await fetch('/api/users', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: userId, role: newRole }),
            });

            if (updateResponse.ok) {
                setUsers(users.map(user =>
                    user.id === userId ? { ...user, role: newRole } : user
                ));
            } else {
                const errorData = await updateResponse.json();
                console.error('Failed to update role:', errorData.error);
            }
        } catch (error) {
            console.error('Error updating role:', error);
        }
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box sx={{ padding: '3rem', marginTop: "3rem" }}>
            <SectionHeading>User Management</SectionHeading>
            <StyledTable>
                <Table stickyHeader>
                    <TableHead>
                        <TableRowCustom>
                            <TableHeaderCell>ID</TableHeaderCell>
                            <TableHeaderCell>First Name</TableHeaderCell>
                            <TableHeaderCell>Last Name</TableHeaderCell>
                            <TableHeaderCell>Gender</TableHeaderCell>
                            <TableHeaderCell>Age</TableHeaderCell>
                            <TableHeaderCell>Role</TableHeaderCell>
                            <TableHeaderCell>Actions</TableHeaderCell>
                        </TableRowCustom>
                    </TableHead>
                    <TableBody>
                        {users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user) => (
                            <TableRowCustom key={user.id}>
                                <TableCellCustom>{user.id}</TableCellCustom>
                                <TableCellCustom>{user.first_name}</TableCellCustom>
                                <TableCellCustom>{user.last_name}</TableCellCustom>
                                <TableCellCustom>{user.gender}</TableCellCustom>
                                <TableCellCustom>{user.age}</TableCellCustom>
                                <TableCellCustom>
                                    <Select
                                        value={user.role}
                                        onChange={(e) => handleRoleChange(user.id, e.target.value)}
                                        sx={{ minWidth: 120 }}
                                    >
                                        <MenuItem value="user">User</MenuItem>
                                        <MenuItem value="admin">Admin</MenuItem>
                                    </Select>
                                </TableCellCustom>
                                <TableCellCustom>
                                    <IconButton
                                        color="error"
                                        onClick={() => handleDeleteUser(user.id)}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCellCustom>
                            </TableRowCustom>
                        ))}
                    </TableBody>
                </Table>
            </StyledTable>
            <StyledTablePagination
                component="div"
                count={users.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                rowsPerPageOptions={[5, 10, 25, 50]}
            />
        </Box>
    );
}
