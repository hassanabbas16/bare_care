import React, { useState } from 'react';
import { Box, Typography, Card, CardContent, CardMedia, IconButton, Grid } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const initialWishlist = [
    {
        id: 1,
        name: 'Gentle Facial Cleanser',
        image: '/images/cleanser.jpg',
    },
    {
        id: 2,
        name: 'Daily Moisturizing Cream',
        image: '/images/moisturizer.jpg',
    },
    {
        id: 3,
        name: 'Brightening Eye Cream',
        image: '/images/eye-cream.jpg',
    },
];

const Wishlist = () => {
    const [wishlist, setWishlist] = useState(initialWishlist);

    const handleRemove = (id) => {
        setWishlist(wishlist.filter(item => item.id !== id));
    };

    return (
        <Box sx={{ mt: 2 }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#38b593' }}>Your Wishlist</Typography>
            <Grid container spacing={2} sx={{ mt: 1 }}>
                {wishlist.map((item) => (
                    <Grid item xs={12} sm={6} md={4} key={item.id}>
                        <Card>
                            <CardMedia
                                component="img"
                                height="140"
                                image={item.image}
                                alt={item.name}
                            />
                            <CardContent>
                                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{item.name}</Typography>
                                <IconButton
                                    color="error"
                                    onClick={() => handleRemove(item.id)}
                                    sx={{ mt: 1 }}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default Wishlist;
