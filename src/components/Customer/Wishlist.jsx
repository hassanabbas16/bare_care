import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useRouter } from 'next/navigation';
import ProductCard from '../products/ProductCard';

const Wishlist = () => {
    const [wishlist, setWishlist] = useState([]);
    const [relatedProducts, setRelatedProducts] = useState([]);
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

                if (products.length > 0) {
                    fetchRelatedProducts(products[0].id);
                }
            } catch (error) {
                console.error('Error fetching wishlist:', error);
            }
        };

        const fetchRelatedProducts = async (productId) => {
            try {
                const res = await fetch(`/api/products/related?product_id=${productId}`);
                if (res.ok) {
                    const data = await res.json();
                    setRelatedProducts(data.slice(0, 4)); // Limit to 4 products
                } else {
                    const errorData = await res.json();
                    console.error('Error fetching related products:', errorData.error);
                }
            } catch (error) {
                console.error('Error fetching related products:', error);
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

            {/* You Might Like Section */}
            {relatedProducts.length > 0 && (
                <Box sx={{ mt: 5 }}>
                    <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#38b593' }}>
                        You Might Like
                    </Typography>
                    <Grid container spacing={2} sx={{ mt: 1 }}>
                        {relatedProducts.map((product) => (
                            <Grid item xs={12} sm={6} md={4} key={product.id}>
                                <ProductCard
                                    product={product}
                                    hideReviewsButton={true}
                                    showRemoveButton={false}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            )}
        </Box>
    );
};

export default Wishlist;
