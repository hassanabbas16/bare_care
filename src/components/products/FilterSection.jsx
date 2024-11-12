// components/products/FilterSection.jsx
import React from "react";
import {
    Box,
    Typography,
    FormControlLabel,
    Checkbox,
    TextField,
    FormGroup,
    Slider,
    Card,
    Divider,
} from "@mui/material";
import { useTheme } from "../../contexts/themeContext";

const FilterSection = ({
                           minPrice,
                           maxPrice,
                           selectedBrands = [],
                           selectedSkinTypes = [],
                           authenticityFilter,
                           ratingFilter,
                           handleMinPriceChange,
                           handleMaxPriceChange,
                           handleBrandChange,
                           handleSkinTypeChange,
                           handleAuthenticityChange,
                           handleRatingChange,
                           brands,
                           hideBrandFilter = false,
                       }) => {
    const { theme } = useTheme();

    return (
        <Card
            sx={{
                width: "340px",
                maxHeight: "80vh",
                overflowY: "auto",
                padding: "3rem",
                borderRadius: "16px",
                backgroundColor: theme.palette.mode === 'light' ? '#fff' : 'transparent',
                color: theme.palette.mode === "light" ? '#212121' : '#fff',
                boxShadow: theme.palette.mode === 'light' ? "0px 4px 12px rgba(0, 0, 0, 0.1)" : "none",
                position: "sticky",
                top: "20px",
                marginBottom: "2rem",
            }}
        >
            <Typography
                sx={{
                    fontSize: '2.6rem',
                    fontWeight: 'bold',
                    marginBottom: '1rem',
                    color: theme.palette.mode === 'light' ? '#212121' : '#fff',
                }}
            >
                Filter by:
            </Typography>

            <Divider
                sx={{
                    backgroundColor: theme.palette.mode === 'light' ? 'lightgray' : '#66bb6a',
                    height: '2px',
                    marginBottom: '1.5rem',
                }}
            />

            <Box sx={{ mt: 2 }}>
                {/* Price Range */}
                <Typography sx={{ fontSize: '1.4rem', fontWeight: 'bold', marginBottom: '0.8rem' }}>
                    Price Range
                </Typography>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "1.2rem",
                    }}
                >
                    <TextField
                        label="Min Price"
                        variant="outlined"
                        value={minPrice}
                        onChange={handleMinPriceChange}
                        size="small"
                        sx={{ width: "45%" }}
                    />
                    <TextField
                        label="Max Price"
                        variant="outlined"
                        value={maxPrice}
                        onChange={handleMaxPriceChange}
                        size="small"
                        sx={{ width: "45%" }}
                    />
                </Box>

                {/* Brand Filter */}
                {!hideBrandFilter && (
                    <>
                        <Typography sx={{ fontSize: '1.4rem', fontWeight: 'bold', marginBottom: '0.8rem' }}>
                            Brands
                        </Typography>
                        <FormGroup sx={{ marginBottom: "1.2rem", pl: 1 }}>
                            {brands && brands.length > 0 ? (
                                brands.map((brand) => (
                                    <FormControlLabel
                                        key={brand}
                                        control={
                                            <Checkbox
                                                checked={selectedBrands.includes(brand)}
                                                onChange={() => handleBrandChange(brand)}
                                            />
                                        }
                                        label={brand}
                                        sx={{ color: theme.palette.mode === 'light' ? '#212121' : '#fff' }}
                                    />
                                ))
                            ) : (
                                <Typography sx={{ fontSize: '1.2rem', color: 'textSecondary' }}>
                                    No brands available.
                                </Typography>
                            )}
                        </FormGroup>
                    </>
                )}

                {/* Skin Type Filter */}
                <Typography sx={{ fontSize: '1.4rem', fontWeight: 'bold', marginBottom: '0.8rem' }}>
                    Skin Type
                </Typography>
                <FormGroup sx={{ marginBottom: "1.2rem", pl: 1 }}>
                    {["Oily", "Dry", "Combination", "Sensitive", "Normal"].map((skinType) => (
                        <FormControlLabel
                            key={skinType}
                            control={
                                <Checkbox
                                    checked={selectedSkinTypes.includes(skinType)}
                                    onChange={() => handleSkinTypeChange(skinType)}
                                />
                            }
                            label={skinType}
                            sx={{ color: theme.palette.mode === 'light' ? '#212121' : '#fff' }}
                        />
                    ))}
                </FormGroup>

                {/* Rating Filter */}
                <Typography sx={{ fontSize: '1.4rem', fontWeight: 'bold', marginBottom: '0.8rem' }}>
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
                    sx={{ color: theme.palette.mode === 'light' ? '#212121' : '#fff', marginBottom: "1.2rem" }}
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
                    sx={{
                        color: theme.palette.mode === 'light' ? '#212121' : '#fff',
                        marginBottom: "1.2rem",
                        pl: 1,
                    }}
                />
            </Box>
        </Card>
    );
};

export default FilterSection;
