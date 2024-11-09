// pages/compare/page.jsx
"use client";
import React, { useContext, useEffect } from "react";
import { useSearchParams } from "next/navigation"; // Import to read query params
import { ComparisonContext } from "../../contexts/ComparisonContext";
import { Box, Typography, Table, TableBody, TableCell, TableRow, Button } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import heroBg2 from "../../../public/Home/herobg2.png";

const placeholderImage = heroBg2;

const ComparePage = () => {
    const { comparedProducts, clearComparedProducts } = useContext(ComparisonContext);
    const router = useRouter();
    const searchParams = useSearchParams();

    // Extract category or brand parameters from the URL
    const category = searchParams.get("category");
    const brand = searchParams.get("brand");

    // Construct the redirection URL based on the current parameters
    const redirectUrl = category ? `/products?category=${category}` : brand ? `/products?brand=${brand}` : "/products";

    useEffect(() => {
        if (comparedProducts.length < 2) {
            // Redirect to the constructed URL if fewer than 2 products are being compared
            router.push(redirectUrl);
        }
    }, [comparedProducts.length, redirectUrl, router]);

    // List of product attributes to compare
    const attributes = [
        { label: "Product Name", key: "product_name" },
        { label: "Brand", key: "brand" },
        { label: "Category", key: "category" },
        { label: "Price", key: "sale_price" },
        { label: "Rating", key: "rating" },
        { label: "Authenticity", key: "authenticity" },
        { label: "Discount", key: "discount" },
        // Add more attributes as needed
    ];

    return (
        <Box sx={{ padding: "2rem" }}>
            <Typography variant="h4" sx={{ marginBottom: "2rem", fontWeight: "bold" }}>
                Compare Products
            </Typography>
            <Table>
                <TableBody>
                    <TableRow>
                        <TableCell variant="head">Product Image</TableCell>
                        {comparedProducts.map((product) => (
                            <TableCell key={product.id}>
                                <Image
                                    src={
                                        product.imageUrl
                                            ? (product.imageUrl.startsWith("http") ? product.imageUrl : `https:${product.imageUrl}`)
                                            : placeholderImage
                                    }
                                    alt={product.product_name || "Product Image"}
                                    width={150}
                                    height={150}
                                    objectFit="contain"
                                />
                            </TableCell>
                        ))}
                    </TableRow>

                    {/* Product Attributes */}
                    {attributes.map((attr) => (
                        <TableRow key={attr.key}>
                            <TableCell variant="head">{attr.label}</TableCell>
                            {comparedProducts.map((product) => (
                                <TableCell key={product.id}>
                                    {product[attr.key] !== undefined ? product[attr.key].toString() : "N/A"}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {/* Clear Comparison Button */}
            <Box sx={{ marginTop: "2rem" }}>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => {
                        clearComparedProducts();
                        router.push(redirectUrl); // Redirect back to the same category or brand page
                    }}
                >
                    Clear Comparison
                </Button>
            </Box>
        </Box>
    );
};

export default ComparePage;
