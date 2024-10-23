// components/ProductModal.jsx
import React from "react";
import { Box, Typography, Modal, IconButton, TextField, Avatar, Rating } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import PersonIcon from "@mui/icons-material/Person";

const ProductModal = ({ open, onClose, product, reviewsData }) => (
    <Modal
        open={open}
        onClose={onClose}
        sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            outline: "none",
        }}
    >
        <Box
            sx={{
                width: "80%",
                maxWidth: "900px",
                backgroundColor: "white",
                borderRadius: "10px",
                padding: "2rem",
                boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.1)",
                display: "flex",
                flexDirection: "row",
            }}
        >
            <IconButton
                sx={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    zIndex: 100,
                }}
                onClick={onClose}
            >
                <CloseIcon />
            </IconButton>

            <Box sx={{ flex: 1, pr: 3 }}>
                <Typography variant="h5" mb={3} color="black">
                    Reviews for {product.name}
                </Typography>
                <TextField
                    fullWidth
                    label="Write a review"
                    multiline
                    minRows={3}
                    variant="outlined"
                    InputProps={{
                        startAdornment: (
                            <PersonIcon />
                        ),
                    }}
                    sx={{ mb: 3 }}
                />
                {reviewsData.map((review, index) => (
                    <Box key={index} mb={2}>
                        <Box display="flex" alignItems="center">
                            <Avatar sx={{ bgcolor: "#1976d2", mr: 2 }}>
                                <PersonIcon />
                            </Avatar>
                            <Box>
                                <Typography variant="h6" fontWeight="bold" color="black">
                                    {review.name}
                                </Typography>
                                <Rating value={review.rating} readOnly precision={0.5} />
                            </Box>
                        </Box>
                        <Typography variant="body2" color="black">
                            {review.comment}
                        </Typography>
                        <Typography variant="caption" sx={{ color: "gray", display: "block", mt: 1 }}>
                            {review.date}
                        </Typography>
                        <IconButton size="small" sx={{ color: "#1976d2", mt: 1 }}>
                            <ThumbUpIcon fontSize="small" />
                        </IconButton>
                        <Typography variant="caption">{review.likes} Likes</Typography>
                    </Box>
                ))}
            </Box>
        </Box>
    </Modal>
);

export default ProductModal;
