// pages/products/page.jsx
"use client";
import dynamic from "next/dynamic";
import React, { useState, useEffect } from "react";
import { Box, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useRouter, useSearchParams } from "next/navigation";
import ProductCard from "../../components/products/ProductCard";
import FilterSection from "../../components/products/FilterSection";
import CategoryBanner from "../../components/products/CategoryBanner";
import RelatedSection from "../../components/products/RelatedSection";

const ProductsPage = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("Products");
    const [brands, setBrands] = useState([]);
    const [wishlistProductIds, setWishlistProductIds] = useState([]);

    const [topBrands, setTopBrands] = useState([]);
    const [filterBrands, setFilterBrands] = useState([]);
    const [selectedBrandFromQuery, setSelectedBrandFromQuery] = useState("");

    // State variables for filters
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
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
            prev.includes(skinType)
                ? prev.filter((s) => s !== skinType)
                : [...prev, skinType]
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
                const response = await fetch("/api/products");
                const data = await response.json();
                setProducts(data);

                const brandCounts = data.reduce((acc, product) => {
                    const brand = product.brand || "Unknown";
                    acc[brand] = (acc[brand] || 0) + 1;
                    return acc;
                }, {});

                const sortedBrands = Object.entries(brandCounts)
                    .sort((a, b) => b[1] - a[1])
                    .map(([brand]) => brand);

                const top10Brands = sortedBrands.slice(0, 10);
                setTopBrands(top10Brands);

                const top5Brands = sortedBrands.slice(0, 5);
                setFilterBrands(top5Brands);

                setBrands(sortedBrands);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        fetchProducts();
    }, []);

    // Fetch wishlist product IDs
    useEffect(() => {
        const fetchWishlist = async () => {
            try {
                const res = await fetch("/api/wishlist");
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

    // Fetch category and brand from query parameters
    useEffect(() => {
        const categoryFromQuery = searchParams.get("category") || "Products";
        const brandFromQuery = searchParams.get("brand") || "";
        setCategory(categoryFromQuery);
        setSelectedBrandFromQuery(brandFromQuery);
        filterProducts(categoryFromQuery, brandFromQuery);
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
    const filterProducts = (categoryFromQuery, brandFromQuery) => {
        let filtered = products.filter((product) => {
            // Ensure properties are defined before accessing them
            const productName = product.product_name || "";
            const productCategory = product.category || "";
            const productBrand = product.brand || "";
            const productRating =
                product.rating !== undefined ? product.rating : 0;
            const productAuthenticity =
                product.authenticity !== undefined
                    ? product.authenticity
                    : true; // Assuming authentic by default

            // Convert price strings to numbers
            const regularPrice =
                parseFloat(product.regular_price.replace(/[^0-9.-]+/g, "")) || 0;
            const salePrice =
                parseFloat(product.sale_price.replace(/[^0-9.-]+/g, "")) || 0;
            const productPrice =
                salePrice > 0 ? salePrice : regularPrice; // Use sale price if available, otherwise regular price

            const matchesSearch = productName
                .toLowerCase()
                .includes(search.toLowerCase());
            const matchesCategory =
                categoryFromQuery === "Products" ||
                productCategory.toLowerCase() ===
                categoryFromQuery.toLowerCase();

            // Brand matching logic
            const matchesBrandFromQuery =
                brandFromQuery === "" || productBrand === brandFromQuery;

            const matchesBrand =
                selectedBrands.length === 0 || selectedBrands.includes(productBrand);

            const matchesBrandFinal =
                brandFromQuery !== "" ? matchesBrandFromQuery : matchesBrand;

            // Adjusted skin type matching logic
            const matchesSkinType =
                selectedSkinTypes.length === 0 ||
                selectedSkinTypes.some((type) =>
                    productName.toLowerCase().includes(type.toLowerCase())
                );

            const matchesAuthenticity =
                !authenticityFilter || productAuthenticity === true;
            const matchesRating =
                productRating >= ratingFilter[0] &&
                productRating <= ratingFilter[1];
            const matchesMinPrice =
                minPrice === "" || productPrice >= parseFloat(minPrice);
            const matchesMaxPrice =
                maxPrice === "" || productPrice <= parseFloat(maxPrice);

            return (
                matchesSearch &&
                matchesCategory &&
                matchesBrandFinal &&
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
            <CategoryBanner category={category} brand={selectedBrandFromQuery} />
            {(category !== "Products" && !selectedBrandFromQuery) && (
                <RelatedSection
                    type="category"
                    category={category}
                    products={products}
                />
            )}

            {selectedBrandFromQuery && (
                <RelatedSection
                    type="brand"
                    brand={selectedBrandFromQuery}
                    brands={topBrands}
                />
            )}

            <Box sx={{ padding: "2rem" }}>
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
                        brands={filterBrands}
                        hideBrandFilter={selectedBrandFromQuery !== ""}
                    />

                    <Box
                        sx={{
                            width: "75%",
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
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

                        {filteredProducts.length > 0 ? (
                            <Grid
                                container
                                spacing={2}
                                sx={{ padding: "0 2rem", justifyContent: "flex-start" }}
                            >
                                {filteredProducts.map((product) => (
                                    <Grid
                                        item
                                        xs={12}
                                        sm={6}
                                        md={4}
                                        lg={3}
                                        key={product.id}
                                    >
                                        <ProductCard
                                            product={product}
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
                                No products match your filters.
                            </Typography>
                        )}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default dynamic(() => Promise.resolve(ProductsPage), {
    ssr: false,
});
