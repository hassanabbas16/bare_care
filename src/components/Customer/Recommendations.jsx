import React from 'react';
import { Box, Typography, Card, CardMedia, CardContent, Button, Grid } from '@mui/material';

const recommendations = [
    {
        id: 1,
        name: 'Hydrating Serum',
        description: 'A deeply hydrating serum to improve skin elasticity.',
        image: '/images/hydrating-serum.jpg',
    },
    {
        id: 2,
        name: 'Vitamin C Moisturizer',
        description: 'Brightens your skin and reduces signs of aging.',
        image: '/images/vitamin-c-moisturizer.jpg',
    },
    {
        id: 3,
        name: 'Acne Control Cleanser',
        description: 'Cleanses pores and reduces breakouts effectively.',
        image: '/images/acne-cleanser.jpg',
    },
];

const Recommendations = () => {
    return (
        <Box sx={{ mt: 2 }}>
            <Typography sx={{ fontWeight: 'bold', color: 'black', fontSize: "2.4rem" }}>Personalized Recommendations</Typography>
            <Grid container spacing={2} sx={{ mt: 1 }}>
                {recommendations.map((product) => (
                    <Grid item xs={12} sm={6} md={4} key={product.id}>
                        <Card>
                            <CardMedia
                                component="img"
                                height="140"
                                image={product.image}
                                alt={product.name}
                            />
                            <CardContent>
                                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{product.name}</Typography>
                                <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>{product.description}</Typography>
                                <Button variant="outlined" sx={{ mt: 2, color: '#38b593', borderColor: '#38b593' }}>
                                    View Product
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default Recommendations;
