import React from "react";
import {
    Box,
    Typography,
    FormControlLabel,
    Checkbox,
    TextField,
    FormGroup,
    Slider,
} from "@mui/material";

const FilterSection = ({ minPrice, maxPrice, selectedBrands = [], selectedSkinTypes = [], authenticityFilter, ratingFilter, handleMinPriceChange, handleMaxPriceChange, handleBrandChange, handleSkinTypeChange, handleAuthenticityChange, handleRatingChange, brands }) => (

    <Box sx={{ width: "25%", backgroundColor: "#f9f9f9", padding: "3rem", borderRadius: "10px" }}>
        <Typography variant="h6" color="black">
            Filter by:
        </Typography>
        <Box sx={{ mt: 2 }}>
            {/* Price Input Fields (Min and Max) */}
            <Typography variant="subtitle1" color="black">
                Price Range
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <TextField
                    label="Min Price"
                    variant="outlined"
                    value={minPrice}
                    onChange={handleMinPriceChange}
                    size="small"
                    sx={{ width: '45%' }}
                />
                <TextField
                    label="Max Price"
                    variant="outlined"
                    value={maxPrice}
                    onChange={handleMaxPriceChange}
                    size="small"
                    sx={{ width: '45%' }}
                />
            </Box>

            {/* Brands */}
            <Typography variant="subtitle1" color="black">
                Brands
            </Typography>
            <FormGroup sx={{ marginBottom: '1rem', pl: 1 }}>
                {brands && brands.length > 0 ? (
                    brands.slice(0, 5).map((brand) => (
                        <FormControlLabel
                            key={brand}
                            control={
                                <Checkbox
                                    checked={selectedBrands.includes(brand)}
                                    onChange={() => handleBrandChange(brand)}
                                />
                            }
                            label={brand}
                            sx={{ color: "black" }}
                        />
                    ))
                ) : (
                    <Typography variant="body2" color="textSecondary">
                        No brands available.
                    </Typography>
                )}
            </FormGroup>

            {/* Skin Type */}
            <Typography variant="subtitle1" color="black">
                Skin Type
            </Typography>
            <FormGroup sx={{ marginBottom: '1rem', pl: 1 }}>
                {['Oily', 'Dry', 'Combination', 'Sensitive', 'Normal'].map((skinType) => (
                    <FormControlLabel
                        key={skinType}
                        control={
                            <Checkbox
                                checked={selectedSkinTypes.includes(skinType)}
                                onChange={() => handleSkinTypeChange(skinType)}
                            />
                        }
                        label={skinType}
                        sx={{ color: "black" }}
                    />
                ))}
            </FormGroup>

            {/* Rating Filter */}
            <Typography variant="subtitle1" color="black">
                Rating
            </Typography>
            <Slider
                value={ratingFilter}
                onChange={handleRatingChange}
                valueLabelDisplay="auto"
                step={1}
                marks
                min={1}
                max={5}
                sx={{ marginBottom: '1rem' }}
            />

            {/* Authenticity Filter */}
            <FormControlLabel
                control={
                    <Checkbox
                        checked={authenticityFilter}
                        onChange={handleAuthenticityChange}
                    />
                }
                label="100% Authentic"
                sx={{ marginBottom: "1rem", color: "black", pl: 1 }}
            />
        </Box>
    </Box>
);

export default FilterSection;
