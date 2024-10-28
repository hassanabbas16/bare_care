"use client";
import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, Box, Card, TextField } from '@mui/material';

// Component for Address Form
function AddressForm({ onSubmit, onCancel }) {
    const [newAddress, setNewAddress] = useState({
        name: '',
        address: '',
        city: '',
        postalCode: '',
        phone: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewAddress((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <Card sx={{
            mt: 4,
            p: 4,
            backgroundColor: '#f9f9f9',
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
            borderRadius: '8px'
        }}>
            <Typography variant="h5" component="h2" gutterBottom>
                Add New Address
            </Typography>
            <TextField
                fullWidth
                label="Name"
                margin="normal"
                name="name"
                value={newAddress.name}
                onChange={handleChange}
                sx={{ backgroundColor: 'white', borderRadius: '4px' }}
            />
            <TextField
                fullWidth
                label="Address"
                margin="normal"
                name="address"
                value={newAddress.address}
                onChange={handleChange}
                sx={{ backgroundColor: 'white', borderRadius: '4px' }}
            />
            <TextField
                fullWidth
                label="City"
                margin="normal"
                name="city"
                value={newAddress.city}
                onChange={handleChange}
                sx={{ backgroundColor: 'white', borderRadius: '4px' }}
            />
            <TextField
                fullWidth
                label="Postal Code"
                margin="normal"
                name="postalCode"
                value={newAddress.postalCode}
                onChange={handleChange}
                sx={{ backgroundColor: 'white', borderRadius: '4px' }}
            />
            <TextField
                fullWidth
                label="Phone Number"
                margin="normal"
                name="phone"
                value={newAddress.phone}
                onChange={handleChange}
                sx={{ backgroundColor: 'white', borderRadius: '4px' }}
            />
            <Box sx={{ mt: 2 }}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => onSubmit(newAddress)}
                    sx={{
                        backgroundColor: '#38b593',
                        color: '#fff',
                        mr: 2,
                        '&:hover': { backgroundColor: '#2d8c74' }
                    }}
                >
                    Save
                </Button>
                <Button
                    variant="outlined"
                    onClick={onCancel}
                    sx={{
                        color: '#38b593',
                        borderColor: '#38b593',
                        '&:hover': { borderColor: '#2d8c74', color: '#2d8c74' }
                    }}
                >
                    Cancel
                </Button>
            </Box>
        </Card>
    );
}

export default function UserDashboard() {
    const [showAddressForm, setShowAddressForm] = useState(false);
    const [user, setUser] = useState(null);
    const [addresses, setAddresses] = useState([]);

    // Fetch user data and addresses from API
    useEffect(() => {
        async function fetchUserData() {
            try {
                const response = await fetch('/api/user');
                if (response.ok) {
                    const data = await response.json();
                    setUser(data);
                    setAddresses(data.addresses);
                } else {
                    console.error('Failed to fetch user data');
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        }

        fetchUserData();
    }, []);

    // Handle adding a new address
    const handleAddAddressClick = () => {
        setShowAddressForm(true);
    };

    const handleCancelAddressForm = () => {
        setShowAddressForm(false);
    };

    const handleSubmitAddressForm = async (newAddress) => {
        try {
            const response = await fetch('/api/addresses', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newAddress),
            });

            if (response.ok) {
                const addedAddress = await response.json();
                setAddresses([...addresses, addedAddress]);  // Update addresses with the new one
                setShowAddressForm(false);  // Close the form
            } else {
                console.error('Failed to add address');
            }
        } catch (error) {
            console.error('Error submitting address form:', error);
        }
    };

    if (!user) {
        return <Typography>Loading...</Typography>;  // Show loading until user data is available
    }

    return (
        <Container maxWidth="md" sx={{ mt: 4, color: '#333', fontFamily: 'Poppins, sans-serif' }}>
            {/* User Info */}
            <Box sx={{ mb: 4 }}>
                <Typography
                    variant="h4"
                    component="h1"
                    gutterBottom
                    sx={{ color: '#38b593', fontWeight: 'bold' }}
                >
                    Welcome, {user.name}!
                </Typography>
                <Typography
                    variant="body1"
                    color="textSecondary"
                    sx={{ color: '#666' }}
                >
                    {user.email}
                </Typography>
            </Box>

            {/* Order History */}
            <Box sx={{ mb: 4 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#38b593' }}>Order History</Typography>
                {user.orderHistory.length === 0 ? (
                    <Typography variant="body2" color="textSecondary">
                        You haven't placed any orders yet.
                    </Typography>
                ) : (
                    <Typography variant="body2">Your order history will be shown here.</Typography>
                )}
            </Box>

            {/* Account Details and Address Management */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
                <Box>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#38b593' }}>Account Details</Typography>
                    <Typography>{user.name}</Typography>
                </Box>
                <Box>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#38b593' }}>Addresses</Typography>
                    <Button
                        variant="outlined"
                        onClick={handleAddAddressClick}
                        sx={{
                            color: '#38b593',
                            borderColor: '#38b593',
                            '&:hover': { borderColor: '#2d8c74', color: '#2d8c74' }
                        }}
                    >
                        Add a new address
                    </Button>
                    {addresses.map((address, index) => (
                        <Box key={index} sx={{ mt: 2 }}>
                            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>{address.name}</Typography>
                            <Typography variant="body2">{address.address}</Typography>
                            <Button
                                variant="text"
                                size="small"
                                sx={{ mr: 1, color: '#38b593' }}
                            >
                                Edit
                            </Button>
                            <Button
                                variant="text"
                                size="small"
                                sx={{ color: '#38b593' }}
                            >
                                Delete
                            </Button>
                        </Box>
                    ))}
                </Box>
            </Box>

            {/* Show Address Form if adding a new address */}
            {showAddressForm && (
                <AddressForm
                    onSubmit={handleSubmitAddressForm}
                    onCancel={handleCancelAddressForm}
                />
            )}
        </Container>
    );
}
