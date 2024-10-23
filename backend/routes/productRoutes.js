// backend/routes/productRoutes.js
const express = require('express');
const router = express.Router();
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://yshmrmdhxmzjztqbjtbd.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlzaG1ybWRoeG16anp0cWJqdGJkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjc4NzI2OTYsImV4cCI6MjA0MzQ0ODY5Nn0.8dTl7N74b5T2pQKXB0-iLVOqKQJiQK-TlEFlmhDN96E'; // Make sure this is a secure key if in production
const supabase = createClient(supabaseUrl, supabaseKey);

// API route to fetch products from Supabase
router.get('/', async (req, res) => {
    try {
        const { data, error } = await supabase.from('products').select('*');
        if (error) throw error;
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
