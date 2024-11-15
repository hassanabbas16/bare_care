"use client";

import React, { useState, useEffect } from 'react';
import {
    Box,
    CircularProgress,
    IconButton,
    Table,
    TableHead,
    TableBody,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import {
    StyledTable,
    TableRowCustom,
    TableHeaderCell,
    TableCellCustom,
    StyledTablePagination,
    SectionHeading,
} from '../mui/AdminPkgs'; // Importing styled components

export default function AdminProducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    useEffect(() => {
        async function fetchProducts() {
            try {
                const response = await fetch('/api/products', { method: 'GET' });
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchProducts();
    }, []);

    const handleDeleteProduct = async (productId) => {
        if (!confirm('Are you sure you want to delete this product?')) return;

        try {
            const deleteResponse = await fetch(`/api/products?id=${productId}`, {
                method: 'DELETE',
            });

            if (deleteResponse.ok) {
                setProducts(products.filter((product) => product.id !== productId));
            } else {
                const errorData = await deleteResponse.json();
                console.error('Failed to delete product:', errorData.error);
            }
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box sx={{ padding: '3rem', marginTop: "3rem" }}>
            <SectionHeading>Product Management</SectionHeading>
            <StyledTable>
                <Table stickyHeader>
                    <TableHead>
                        <TableRowCustom>
                            <TableHeaderCell>ID</TableHeaderCell>
                            <TableHeaderCell>Product Name</TableHeaderCell>
                            <TableHeaderCell>Brand</TableHeaderCell>
                            <TableHeaderCell>Category</TableHeaderCell>
                            <TableHeaderCell>Regular Price</TableHeaderCell>
                            <TableHeaderCell>Sale Price</TableHeaderCell>
                            <TableHeaderCell>Discount</TableHeaderCell>
                            <TableHeaderCell>Rating</TableHeaderCell>
                            <TableHeaderCell>Stock Info</TableHeaderCell>
                            <TableHeaderCell>Vendor</TableHeaderCell>
                            <TableHeaderCell>Authenticity</TableHeaderCell>
                            <TableHeaderCell>Skin Type</TableHeaderCell>
                            <TableHeaderCell>Concern</TableHeaderCell>
                            <TableHeaderCell>Fragrance-Free</TableHeaderCell>
                            <TableHeaderCell>Organic Level</TableHeaderCell>
                            <TableHeaderCell>Allergen-Free</TableHeaderCell>
                            <TableHeaderCell>Sensitivity Level</TableHeaderCell>
                            <TableHeaderCell>Age Range</TableHeaderCell>
                            <TableHeaderCell>Actions</TableHeaderCell>
                        </TableRowCustom>
                    </TableHead>
                    <TableBody>
                        {products.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((product) => (
                            <TableRowCustom key={product.id}>
                                <TableCellCustom>{product.id}</TableCellCustom>
                                <TableCellCustom>{product.product_name}</TableCellCustom>
                                <TableCellCustom>{product.brand}</TableCellCustom>
                                <TableCellCustom>{product.category}</TableCellCustom>
                                <TableCellCustom>{product.regular_price}</TableCellCustom>
                                <TableCellCustom>{product.sale_price}</TableCellCustom>
                                <TableCellCustom>{product.discount}</TableCellCustom>
                                <TableCellCustom>{product.rating}</TableCellCustom>
                                <TableCellCustom>{product.stock_info}</TableCellCustom>
                                <TableCellCustom>{product.vendor_name}</TableCellCustom>
                                <TableCellCustom>{product.authenticity ? 'Yes' : 'No'}</TableCellCustom>
                                <TableCellCustom>{product.skin_type}</TableCellCustom>
                                <TableCellCustom>{product.concern}</TableCellCustom>
                                <TableCellCustom>{product.fragrance_free ? 'Yes' : 'No'}</TableCellCustom>
                                <TableCellCustom>{product.organic_level}</TableCellCustom>
                                <TableCellCustom>{product.allergen_free ? 'Yes' : 'No'}</TableCellCustom>
                                <TableCellCustom>{product.sensitivity_level}</TableCellCustom>
                                <TableCellCustom>{product.age_range}</TableCellCustom>
                                <TableCellCustom>
                                    <IconButton
                                        color="error"
                                        onClick={() => handleDeleteProduct(product.id)}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCellCustom>
                            </TableRowCustom>
                        ))}
                    </TableBody>
                </Table>
            </StyledTable>
            <StyledTablePagination
                component="div"
                count={products.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                rowsPerPageOptions={[5, 10, 25, 50]}
            />
        </Box>
    );
}
