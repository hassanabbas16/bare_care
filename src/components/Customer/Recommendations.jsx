// /app/recommendations/page.jsx
"use client";
import React, { useState, useEffect, useContext } from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { useRouter } from 'next/navigation';
import { ComparisonContext } from '../../contexts/ComparisonContext';
import ProductCard from '../../components/products/ProductCard';
import { useTheme } from '../../contexts/themeContext';
import FloatingCircle from '../../components/common/FloatingCircle';

const RecommendationsPage = () => {
    const { theme } = useTheme();
    const router = useRouter();
    const [instantRecommendations, setInstantRecommendations] = useState([]);
    const [alsoSuitedRecommendations, setAlsoSuitedRecommendations] = useState([]);
    const [wishlistProductIds, setWishlistProductIds] = useState([]);
    const {
        comparedProducts,
        addProductToCompare,
        removeProductFromCompare,
    } = useContext(ComparisonContext);

    const handleCompareChange = (product, isChecked) => {
        if (isChecked) {
            if (comparedProducts.length < 2) {
                addProductToCompare(product);
            } else {
                alert("You can only compare up to 2 products at a time.");
            }
        } else {
            removeProductFromCompare(product.id);
        }
    };

    useEffect(() => {
        const fetchRecommendations = async () => {
            try {
                const sessionRes = await fetch('/api/auth/session');
                const sessionData = await sessionRes.json();
                if (!sessionData.loggedIn) {
                    router.push('/login');
                    return;
                }
                const user_id = sessionData.user.id;

                // Update recommendations
                const res = await fetch('/api/recommendations', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ user_id }),
                });

                if (!res.ok) {
                    throw new Error('Failed to fetch recommendations');
                }

                const data = await res.json();
                const productIds = data.product_ids;

                // Fetch recommendations with recommendation_type
                const recsRes = await fetch(`/api/recommendations/with-types`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ user_id }),
                });

                if (!recsRes.ok) {
                    throw new Error('Failed to fetch recommendations with types');
                }

                const recsData = await recsRes.json();
                const recommendationsWithType = recsData.recommendations;

                // Create a mapping from product ID to recommendation_type
                const recommendationTypeMap = {};
                recommendationsWithType.forEach(rec => {
                    recommendationTypeMap[rec.product_id] = rec.recommendation_type;
                });

                // Fetch product details
                const productsRes = await fetch('/api/products/by-ids', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ ids: productIds }),
                });

                if (!productsRes.ok) {
                    throw new Error('Failed to fetch product details');
                }

                const productsData = await productsRes.json();
                const products = productsData.products;

                // Map products with their recommendation_type
                const productsWithType = products.map(product => ({
                    ...product,
                    recommendation_type: recommendationTypeMap[product.id],
                }));

                // Separate recommendations based on recommendation_type
                const instant = productsWithType.filter(p => p.recommendation_type === 'instant');
                const alsoSuited = productsWithType.filter(p => p.recommendation_type === 'also_suited');

                setInstantRecommendations(instant);
                setAlsoSuitedRecommendations(alsoSuited);
            } catch (error) {
                console.error('Error fetching recommendations:', error);
            }
        };
        fetchRecommendations();
    }, []);

    useEffect(() => {
        const fetchWishlist = async () => {
            try {
                const res = await fetch('/api/wishlist');
                if (res.ok) {
                    const data = await res.json();
                    const productIds = data.wishlistItems.map(
                        (item) => item.product_id
                    );
                    setWishlistProductIds(productIds);
                } else {
                    // User is not logged in or other error
                    setWishlistProductIds([]);
                }
            } catch (error) {
                console.error("Error fetching wishlist:", error);
                setWishlistProductIds([]);
            }
        };
        fetchWishlist();
    }, []);

    return (
        <Box sx={{ padding: "3rem" }}>
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", mt: 4 }}>
                <Typography sx={{ fontSize: "3rem", fontWeight: "600", marginBottom: "2rem", color: theme.palette.mode === 'light' ? '#000' : '#fff' }}>
                    Personalized Recommendations
                </Typography>
            </Box>

            {/* Instant Recommendations Section */}
            <Typography sx={{ marginLeft: "2rem", marginBottom: "1rem", color: "black", fontSize: "2rem" }}>
                Instant Recommendations
            </Typography>

            {instantRecommendations.length > 0 ? (
                <Grid
                    container
                    spacing={2}
                    sx={{ padding: "0 2rem", justifyContent: "center" }}
                >
                    {instantRecommendations.map((product) => (
                        <Grid
                            item
                            xs={12}
                            sm={6}
                            md={4}
                            lg={4}
                            key={product.id}
                        >
                            <ProductCard
                                product={product}
                                isCompared={comparedProducts.some((p) => p.id === product.id)}
                                onCompareChange={handleCompareChange}
                                isInWishlist={wishlistProductIds.includes(
                                    product.id
                                )}
                            />
                        </Grid>
                    ))}
                </Grid>
            ) : (
                <Typography
                    variant="h6"
                    color="textSecondary"
                    sx={{ marginLeft: "2rem" }}
                >
                    No instant recommendations available at the moment.
                </Typography>
            )}
            <Typography sx={{ marginLeft: "2rem", marginTop: "2rem", marginBottom: "1rem", color: "black", fontSize: "2rem" }}>
                Also Suited For You
            </Typography>

            {alsoSuitedRecommendations.length > 0 ? (
                <Grid
                    container
                    spacing={2}
                    sx={{ padding: "0 2rem", justifyContent: "center" }}
                >
                    {alsoSuitedRecommendations.map((product) => (
                        <Grid
                            item
                            xs={12}
                            sm={6}
                            md={4}
                            lg={4}
                            key={product.id}
                        >
                            <ProductCard
                                product={product}
                                isCompared={comparedProducts.some((p) => p.id === product.id)}
                                onCompareChange={handleCompareChange}
                                isInWishlist={wishlistProductIds.includes(
                                    product.id
                                )}
                            />
                        </Grid>
                    ))}
                </Grid>
            ) : (
                <Typography
                    variant="h6"
                    color="textSecondary"
                    sx={{ marginLeft: "2rem" }}
                >
                    No additional recommendations available at the moment.
                </Typography>
            )}
        </Box>
    );
};

export default RecommendationsPage;
