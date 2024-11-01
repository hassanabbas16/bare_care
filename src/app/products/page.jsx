"use client";
import dynamic from 'next/dynamic';
import React, { useState, useEffect } from "react";
import { Box, TextField } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useSearchParams } from "next/navigation";
import ProductCard from "../../components/products/ProductCard";
import FilterSection from "../../components/products/FilterSection";
import ProductModal from "../../components/products/ProductModal";
import CategoryBanner from "../../components/products/CategoryBanner";

const ProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("Products");
    const [brands, setBrands] = useState([]);
    const searchParams = useSearchParams();

    // New state variables for filters
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [selectedSkinTypes, setSelectedSkinTypes] = useState([]);
    const [authenticityFilter, setAuthenticityFilter] = useState(false);
    const [ratingFilter, setRatingFilter] = useState([1, 5]); // Assuming a range

    // Handler functions
    const handleMinPriceChange = (e) => setMinPrice(e.target.value);
    const handleMaxPriceChange = (e) => setMaxPrice(e.target.value);

    const handleBrandChange = (brand) => {
        setSelectedBrands((prev) =>
            prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
        );
    };

    const handleSkinTypeChange = (skinType) => {
        setSelectedSkinTypes((prev) =>
            prev.includes(skinType) ? prev.filter((s) => s !== skinType) : [...prev, skinType]
        );
    };

    const handleAuthenticityChange = () => {
        setAuthenticityFilter((prev) => !prev);
    };

    const handleRatingChange = (event, newValue) => {
        setRatingFilter(newValue);
    };

    // Fetch products from API
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('/api/products');
                const data = await response.json();
                setProducts(data);
                setFilteredProducts(data);

                const uniqueBrands = [...new Set(data.map((product) => product.brand))];
                setBrands(uniqueBrands);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        fetchProducts();
    }, []);

    // Filter products based on search and category
    useEffect(() => {
        const categoryFromQuery = searchParams.get("category") || "Products";
        setCategory(categoryFromQuery);
        filterProducts(categoryFromQuery);
    }, [
        search,
        searchParams,
        products,
        minPrice,
        maxPrice,
        selectedBrands,
        selectedSkinTypes,
        authenticityFilter,
        ratingFilter,
    ]);

    // Filter products helper function
    const filterProducts = (categoryFromQuery) => {
        let filtered = products.filter((product) => {
            const matchesSearch = product.product_name.toLowerCase().includes(search.toLowerCase());
            const matchesCategory =
                categoryFromQuery === "Products" ||
                product.category.toLowerCase() === categoryFromQuery.toLowerCase();
            const matchesBrand =
                selectedBrands.length === 0 || selectedBrands.includes(product.brand);
            const matchesSkinType =
                selectedSkinTypes.length === 0 ||
                selectedSkinTypes.some((type) => product.skin_type.includes(type));
            const matchesAuthenticity = !authenticityFilter || product.isAuthentic;
            const matchesRating = product.rating >= ratingFilter[0] && product.rating <= ratingFilter[1];
            const matchesMinPrice = minPrice === '' || product.price >= parseFloat(minPrice);
            const matchesMaxPrice = maxPrice === '' || product.price <= parseFloat(maxPrice);

            return (
                matchesSearch &&
                matchesCategory &&
                matchesBrand &&
                matchesSkinType &&
                matchesAuthenticity &&
                matchesRating &&
                matchesMinPrice &&
                matchesMaxPrice
            );
        });

        setFilteredProducts(filtered);
    };

    return (
        <Box>
            <CategoryBanner category={category} />
            <Box sx={{ padding: "2rem", backgroundColor: "white" }}>
                <Box sx={{ display: "flex", gap: "2rem" }}>
                    <FilterSection
                        minPrice={minPrice}
                        maxPrice={maxPrice}
                        selectedBrands={selectedBrands}
                        selectedSkinTypes={selectedSkinTypes}
                        authenticityFilter={authenticityFilter}
                        ratingFilter={ratingFilter}
                        handleMinPriceChange={handleMinPriceChange}
                        handleMaxPriceChange={handleMaxPriceChange}
                        handleBrandChange={handleBrandChange}
                        handleSkinTypeChange={handleSkinTypeChange}
                        handleAuthenticityChange={handleAuthenticityChange}
                        handleRatingChange={handleRatingChange}
                        brands={brands}
                    />

                    <Box sx={{ width: "75%", display: "flex", flexDirection: "column" }}>
                        <Box sx={{ mb: 2, maxWidth: "400px", marginLeft: "2rem" }}>
                            <TextField
                                label="Search Products"
                                variant="outlined"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                sx={{ width: "100%", marginBottom: "1.5rem" }}
                                InputProps={{ style: { color: "black" } }}
                            />
                        </Box>

                        <Grid container spacing={2} sx={{ padding: "0 2rem", justifyContent: "flex-start" }}>
                            {filteredProducts.map((product) => (
                                <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                                    <ProductCard product={product} />
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default dynamic(() => Promise.resolve(ProductsPage), { ssr: false });
