"use client";
import React, { useState, useEffect } from "react";
import { Box, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import ProductCard from "../../components/products/ProductCard";
import FilterSection from "../../components/products/FilterSection";
import ProductModal from "../../components/products/ProductModal";
import CategoryBanner from "../../components/products/CategoryBanner";

const ProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(10000);
    const [priceRange, setPriceRange] = useState([0, 10000]);
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [selectedSkinTypes, setSelectedSkinTypes] = useState([]);
    const [ratingFilter, setRatingFilter] = useState([1, 5]);
    const [authenticityFilter, setAuthenticityFilter] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [brands, setBrands] = useState([]); // New state for brands

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/products');
                const data = await response.json();
                setProducts(data);
                setFilteredProducts(data);

                // Extracting unique brands from products
                const uniqueBrands = [...new Set(data.map((product) => product.brand))];
                setBrands(uniqueBrands); // Set brands for filtering
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        fetchProducts();
    }, []);

    useEffect(() => {
        filterProducts();
    }, [search, priceRange, selectedBrands, selectedSkinTypes, ratingFilter, authenticityFilter, products]);

    const filterProducts = () => {
        let filtered = products.filter((product) => {
            return (
                product.product_name.toLowerCase().includes(search.toLowerCase()) &&
                (product.sale_price >= priceRange[0] && product.sale_price <= priceRange[1]) &&
                (selectedBrands.length === 0 || selectedBrands.includes(product.brand)) &&
                (selectedSkinTypes.length === 0 || selectedSkinTypes.some((type) => product.product_name.toLowerCase().includes(type.toLowerCase()))) &&
                (authenticityFilter ? product.authenticity : true) &&
                product.rating >= ratingFilter[0] && product.rating <= ratingFilter[1]
            );
        });
        setFilteredProducts(filtered);
    };

    const handlePriceChange = (event, newValue) => {
        setPriceRange(newValue);
    };

    const handleMinPriceChange = (event) => {
        setMinPrice(event.target.value);
        setPriceRange([event.target.value, priceRange[1]]);
    };

    const handleMaxPriceChange = (event) => {
        setMaxPrice(event.target.value);
        setPriceRange([priceRange[0], event.target.value]);
    };

    const handleBrandChange = (brand) => {
        if (selectedBrands.includes(brand)) {
            setSelectedBrands(selectedBrands.filter((b) => b !== brand));
        } else {
            setSelectedBrands([...selectedBrands, brand]);
        }
    };

    const handleSkinTypeChange = (skinType) => {
        if (selectedSkinTypes.includes(skinType)) {
            setSelectedSkinTypes(selectedSkinTypes.filter((type) => type !== skinType));
        } else {
            setSelectedSkinTypes([...selectedSkinTypes, skinType]);
        }
    };

    const handleRatingChange = (event, newValue) => {
        setRatingFilter(newValue);
    };

    return (
        <Box>
            <Navbar />
            <CategoryBanner />
            <Box sx={{ padding: "2rem", backgroundColor: "white" }}>
                <Box sx={{ display: "flex", gap: "2rem" }}>
                    <FilterSection
                        priceRange={priceRange}
                        minPrice={minPrice}
                        maxPrice={maxPrice}
                        selectedBrands={selectedBrands}
                        selectedSkinTypes={selectedSkinTypes}
                        authenticityFilter={authenticityFilter}
                        ratingFilter={ratingFilter}
                        handlePriceChange={handlePriceChange}
                        handleMinPriceChange={handleMinPriceChange}
                        handleMaxPriceChange={handleMaxPriceChange}
                        handleBrandChange={handleBrandChange}
                        handleSkinTypeChange={handleSkinTypeChange}
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
            {selectedProduct && (
                <ProductModal
                    open={openModal}
                    onClose={() => setOpenModal(false)}
                    product={selectedProduct}
                />
            )}
            <Footer />
        </Box>
    );
};

export default ProductsPage;
