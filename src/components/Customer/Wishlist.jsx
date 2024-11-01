import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useRouter } from 'next/navigation';
import ProductCard from '../products/ProductCard';

const Wishlist = () => {
    const [wishlist, setWishlist] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const fetchWishlist = async () => {
            try {
                const res = await fetch('/api/wishlist');
                if (res.status === 401) {
                    router.push(`/login?redirect=${encodeURIComponent('/wishlist')}`);
                    return;
                }
                const data = await res.json();
                const products = data.wishlistItems.map((item) => item.products);
                setWishlist(products);
            } catch (error) {
                console.error('Error fetching wishlist:', error);
            }
        };
        fetchWishlist();
    }, []);

    const handleRemove = async (productId) => {
        try {
            const res = await fetch('/api/wishlist/remove', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ product_id: productId }),
            });
            if (res.ok) {
                setWishlist(wishlist.filter((item) => item.id !== productId));
            } else {
                const errorData = await res.json();
                console.error('Error removing from wishlist:', errorData.error);
            }
        } catch (error) {
            console.error('Error removing from wishlist:', error);
        }
    };

    return (
        <Box sx={{ mt: 2 }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#38b593' }}>
                Your Wishlist
            </Typography>
            {wishlist.length > 0 ? (
                <Grid container spacing={2} sx={{ mt: 1 }}>
                    {wishlist.map((product) => (
                        <Grid item xs={12} sm={6} md={4} key={product.id}>
                            <ProductCard
                                product={product}
                                hideReviewsButton={false}
                                showRemoveButton={true}
                                onRemove={() => handleRemove(product.id)}
                            />
                        </Grid>
                    ))}
                </Grid>
            ) : (
                <Typography variant="h6" sx={{ mt: 2 }}>
                    Your wishlist is empty.
                </Typography>
            )}
        </Box>
    );
};

export default Wishlist;
