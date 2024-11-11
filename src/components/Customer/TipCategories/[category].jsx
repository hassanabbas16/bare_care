import React from 'react';
import { useRouter } from 'next/router';
import { Box, Typography, Card, CardContent } from '@mui/material';

// Sample data for each category
const tipsData = {
    acne: [
        "Wash your face twice a day to prevent clogged pores.",
        "Avoid harsh scrubbing on acne-prone areas.",
        "Use non-comedogenic skincare products to reduce breakouts.",
        "Limit dairy intake as it can contribute to acne.",
        "Avoid touching your face to prevent spreading bacteria.",
        "Apply a gentle exfoliant once a week.",
        "Use a salicylic acid cleanser for deep pore cleaning.",
        "Stay hydrated to keep your skin healthy.",
        "Apply a moisturizer suited for acne-prone skin.",
        "Consult a dermatologist if your acne persists.",
    ],
    hyperpigmentation: [
        "Apply sunscreen daily to prevent dark spots from worsening.",
        "Use products with vitamin C to brighten the skin.",
        "Avoid touching or picking at dark spots.",
        "Try chemical exfoliants like AHA/BHA for gentle skin renewal.",
        "Incorporate retinoids into your routine with caution.",
        "Consider niacinamide for reducing discoloration.",
        "Avoid excessive sun exposure and use protective clothing.",
        "Apply a dark spot treatment with kojic acid or licorice extract.",
        "Stay patient; hyperpigmentation takes time to fade.",
        "Seek professional treatments like chemical peels if necessary.",
    ],
    scarring: [
        "Massage scars with vitamin E oil to improve texture.",
        "Use silicone sheets or gels to reduce scar visibility.",
        "Apply sunscreen to prevent scars from darkening.",
        "Try a scar cream with onion extract.",
        "Consider microneedling for deeper scars (consult a professional).",
        "Use products with retinoids to promote collagen production.",
        "Avoid picking at healing wounds to minimize scarring.",
        "Apply aloe vera for its soothing and healing properties.",
        "Exfoliate gently to encourage cell renewal.",
        "Stay consistent with treatments for the best results.",
    ],
    "oily-skin": [
        "Use a gentle foaming cleanser to remove excess oil.",
        "Avoid heavy, greasy moisturizers.",
        "Incorporate clay masks to absorb excess oil.",
        "Blot your skin with oil-absorbing sheets as needed.",
        "Use a toner with witch hazel to control oil production.",
        "Choose non-comedogenic skincare products.",
        "Avoid overwashing, as it can lead to more oil production.",
        "Use a lightweight, oil-free sunscreen daily.",
        "Consider products with salicylic acid to clean out pores.",
        "Exfoliate weekly to remove dead skin cells.",
    ],
    "dry-skin": [
        "Use a cream-based cleanser to maintain moisture.",
        "Apply a hydrating serum before moisturizer.",
        "Use a rich, emollient moisturizer twice daily.",
        "Avoid hot showers, as they can dry out your skin.",
        "Incorporate hyaluronic acid for extra hydration.",
        "Choose gentle exfoliants to avoid skin irritation.",
        "Apply a thick layer of moisturizer before bed.",
        "Use a humidifier in your room during dry seasons.",
        "Drink plenty of water to keep skin hydrated from within.",
        "Avoid alcohol-based skincare products.",
    ],
    "anti-aging": [
        "Incorporate retinoids to reduce fine lines and wrinkles.",
        "Apply sunscreen daily to prevent premature aging.",
        "Use a vitamin C serum to brighten the skin.",
        "Stay hydrated for better skin elasticity.",
        "Consider collagen-boosting supplements.",
        "Apply a rich, nourishing moisturizer before bed.",
        "Get plenty of sleep to allow skin repair.",
        "Use an eye cream to address fine lines around the eyes.",
        "Eat antioxidant-rich foods to support skin health.",
        "Limit sugar intake, as it can cause glycation in the skin.",
    ],
    "sensitive-skin": [
        "Choose fragrance-free and hypoallergenic products.",
        "Avoid harsh exfoliants or physical scrubs.",
        "Patch-test new products before full application.",
        "Use products with soothing ingredients like aloe vera.",
        "Avoid products with alcohol, which can irritate skin.",
        "Apply a gentle, non-foaming cleanser.",
        "Use a moisturizer designed for sensitive skin.",
        "Limit sun exposure and apply mineral sunscreen.",
        "Avoid frequent changes in your skincare routine.",
        "Stay hydrated to support your skin's barrier function.",
    ]
};

const TipCategoryPage = () => {
    const router = useRouter();
    const { category } = router.query; // Get the category from the URL

    // Retrieve tips for the selected category
    const tips = tipsData[category] || [];

    // Capitalize the first letter of the category name for display
    const formattedCategory = category ? category.charAt(0).toUpperCase() + category.slice(1).replace("-", " ") : "";

    return (
        <Box sx={{ padding: 4 }}>
            <Typography variant="h4" gutterBottom>
                {formattedCategory} Tips
            </Typography>
            {tips.length > 0 ? (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
                    {tips.map((tip, index) => (
                        <Card key={index} sx={{ width: 300, padding: 2 }}>
                            <CardContent>
                                <Typography variant="body1">{tip}</Typography>
                            </CardContent>
                        </Card>
                    ))}
                </Box>
            ) : (
                <Typography variant="body1" color="textSecondary">
                    No tips available for this category.
                </Typography>
            )}
        </Box>
    );
};

export default TipCategoryPage;
