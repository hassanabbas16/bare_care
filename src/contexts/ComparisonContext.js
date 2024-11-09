"use client";
import React, { createContext, useState } from "react";

export const ComparisonContext = createContext();

export const ComparisonProvider = ({ children }) => {
    const [comparedProducts, setComparedProducts] = useState([]);

    const addProductToCompare = (product) => {
        setComparedProducts((prev) => [...prev, product]);
    };

    const removeProductFromCompare = (productId) => {
        setComparedProducts((prev) =>
            prev.filter((product) => product.id !== productId)
        );
    };

    const clearComparedProducts = () => {
        setComparedProducts([]);
    };

    return (
        <ComparisonContext.Provider
            value={{
                comparedProducts,
                addProductToCompare,
                removeProductFromCompare,
                clearComparedProducts,
            }}
        >
            {children}
        </ComparisonContext.Provider>
    );
};
