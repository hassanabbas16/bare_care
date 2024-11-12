import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from "swiper/modules";
import { Typography, Box, Card, CardContent, CardMedia, Tabs, Tab } from '@mui/material';
import { styled, keyframes } from '@mui/system';
import 'swiper/css';
import 'swiper/css/autoplay';

// Animation for cards
const fadeInUp = keyframes`
    0% {
        opacity: 0;
        transform: translateY(20px);
    }
    100% {
        opacity: 1;
        transform: translateY(0);
    }
`;

// Swiper Component
const MarqueeSwiper = ({ texts = ["Hello, radiant souls! Let’s dive into a sea of skincare knowledge and surf our way to glowing skin!"], speed = 30000 }) => {
    return (
        <div
            style={{
                position: "relative",
                overflow: "hidden",
                backgroundColor: "black",
                color: "white",
                padding: "10px 0",
                width: "100%",
                whiteSpace: "nowrap",
                textAlign: "center",
                top: "0",
                zIndex: 100,
                marginBottom: "24px",
            }}
        >
            <Swiper
                modules={[Autoplay]}
                slidesPerView="auto"
                spaceBetween={50}
                loop={true}
                speed={speed}
                autoplay={{
                    delay: 0,
                    disableOnInteraction: false,
                }}
                allowTouchMove={false}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                {texts.map((text, index) => (
                    <SwiperSlide
                        key={index}
                        style={{
                            width: 'auto',
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <Typography
                            variant="body1"
                            sx={{
                                whiteSpace: 'nowrap',
                                fontSize: {
                                    xs: '0.8rem',
                                    sm: '1rem',
                                    md: '1.2rem',
                                    lg: '1.4rem',
                                },
                            }}
                        >
                            {text}
                        </Typography>
                        <Box
                            sx={{
                                width: {
                                    xs: '15px',
                                    sm: '20px',
                                    md: '30px',
                                    lg: '50px',
                                },
                            }}
                        ></Box>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

// Sample data for each category
const tipsData = {
    general: [
        { tip: "Maintain a balanced diet for healthier skin.", image: "/images/general1.jpg" },
        { tip: "Get adequate sleep to support skin repair.", image: "/images/general2.jpg" },
        { tip: "Drink plenty of water to stay hydrated.", image: "/images/general3.jpg" },
        { tip: "Exercise regularly to improve circulation.", image: "/images/general4.jpg" },
        { tip: "Use sunscreen daily to protect from UV damage.", image: "/images/general5.jpg" },
        { tip: "Clean your phone screen to reduce bacteria contact.", image: "/images/general6.jpg" },
        { tip: "Avoid smoking for better skin health.", image: "/images/general7.jpg" },
        { tip: "Manage stress as it can affect skin condition.", image: "/images/general8.jpg" },
        { tip: "Use gentle skincare products for your skin type.", image: "/images/general9.jpg" },
        { tip: "Do not touch your face frequently.", image: "/images/general10.jpg" },
        { tip: "Change your pillowcase regularly to reduce acne.", image: "/images/general11.jpg" },
        { tip: "Avoid harsh chemicals on your skin.", image: "/images/general12.jpg" },
    ],
    acne: [
        { tip: "Wash your face twice a day to prevent clogged pores.", image: "/images/acne1.jpg" },
        { tip: "Avoid harsh scrubbing on acne-prone areas.", image: "/images/acne2.jpg" },
        { tip: "Use non-comedogenic skincare products to reduce breakouts.", image: "/images/acne3.jpg" },
        { tip: "Limit dairy intake as it can contribute to acne.", image: "/images/acne4.jpg" },
        { tip: "Avoid touching your face to prevent spreading bacteria.", image: "/images/acne5.jpg" },
        { tip: "Apply a gentle exfoliant once a week.", image: "/images/acne6.jpg" },
        { tip: "Use a salicylic acid cleanser for deep pore cleaning.", image: "/images/acne7.jpg" },
        { tip: "Stay hydrated to keep your skin healthy.", image: "/images/acne8.jpg" },
        { tip: "Apply a moisturizer suited for acne-prone skin.", image: "/images/acne9.jpg" },
        { tip: "Consult a dermatologist if your acne persists.", image: "/images/acne10.jpg" },
        { tip: "Avoid oily and greasy foods.", image: "/images/acne11.jpg" },
        { tip: "Try a clay mask to help absorb excess oil.", image: "/images/acne12.jpg" },
    ],
    hyperpigmentation: [
        { tip: "Apply sunscreen daily to prevent dark spots from worsening.", image: "/images/hyperpigmentation1.jpg" },
        { tip: "Use products with vitamin C to brighten the skin.", image: "/images/hyperpigmentation2.jpg" },
        { tip: "Avoid touching or picking at dark spots.", image: "/images/hyperpigmentation3.jpg" },
        { tip: "Try chemical exfoliants like AHA/BHA for gentle skin renewal.", image: "/images/hyperpigmentation4.jpg" },
        { tip: "Incorporate retinoids into your routine with caution.", image: "/images/hyperpigmentation5.jpg" },
        { tip: "Consider niacinamide for reducing discoloration.", image: "/images/hyperpigmentation6.jpg" },
        { tip: "Avoid excessive sun exposure and use protective clothing.", image: "/images/hyperpigmentation7.jpg" },
        { tip: "Apply a dark spot treatment with kojic acid or licorice extract.", image: "/images/hyperpigmentation8.jpg" },
        { tip: "Stay patient; hyperpigmentation takes time to fade.", image: "/images/hyperpigmentation9.jpg" },
        { tip: "Seek professional treatments like chemical peels if necessary.", image: "/images/hyperpigmentation10.jpg" },
        { tip: "Add alpha-arbutin to your routine for pigmentation issues.", image: "/images/hyperpigmentation11.jpg" },
        { tip: "Use licorice root extract for its brightening properties.", image: "/images/hyperpigmentation12.jpg" },
    ],
    scarring: [
        { tip: "Massage scars with vitamin E oil to improve texture.", image: "/images/scarring1.jpg" },
        { tip: "Use silicone sheets or gels to reduce scar visibility.", image: "/images/scarring2.jpg" },
        { tip: "Apply sunscreen to prevent scars from darkening.", image: "/images/scarring3.jpg" },
        { tip: "Try a scar cream with onion extract.", image: "/images/scarring4.jpg" },
        { tip: "Consider microneedling for deeper scars (consult a professional).", image: "/images/scarring5.jpg" },
        { tip: "Use products with retinoids to promote collagen production.", image: "/images/scarring6.jpg" },
        { tip: "Avoid picking at healing wounds to minimize scarring.", image: "/images/scarring7.jpg" },
        { tip: "Apply aloe vera for its soothing and healing properties.", image: "/images/scarring8.jpg" },
        { tip: "Exfoliate gently to encourage cell renewal.", image: "/images/scarring9.jpg" },
        { tip: "Stay consistent with treatments for the best results.", image: "/images/scarring10.jpg" },
        { tip: "Use hyaluronic acid for added hydration.", image: "/images/scarring11.jpg" },
        { tip: "Consider laser treatments for severe scarring.", image: "/images/scarring12.jpg" },
    ],
    "oily-skin": [
        { tip: "Use a gentle foaming cleanser to remove excess oil.", image: "/images/oily1.jpg" },
        { tip: "Avoid heavy, greasy moisturizers.", image: "/images/oily2.jpg" },
        { tip: "Incorporate clay masks to absorb excess oil.", image: "/images/oily3.jpg" },
        { tip: "Blot your skin with oil-absorbing sheets as needed.", image: "/images/oily4.jpg" },
        { tip: "Use a toner with witch hazel to control oil production.", image: "/images/oily5.jpg" },
        { tip: "Choose non-comedogenic skincare products.", image: "/images/oily6.jpg" },
        { tip: "Avoid overwashing, as it can lead to more oil production.", image: "/images/oily7.jpg" },
        { tip: "Use a lightweight, oil-free sunscreen daily.", image: "/images/oily8.jpg" },
        { tip: "Consider products with salicylic acid to clean out pores.", image: "/images/oily9.jpg" },
        { tip: "Exfoliate weekly to remove dead skin cells.", image: "/images/oily10.jpg" },
        { tip: "Limit makeup use and choose oil-free options.", image: "/images/oily11.jpg" },
        { tip: "Apply a mattifying primer if you wear makeup.", image: "/images/oily12.jpg" },
    ],
    "dry-skin": [
        { tip: "Use a cream-based cleanser to maintain moisture.", image: "/images/dry1.jpg" },
        { tip: "Apply a hydrating serum before moisturizer.", image: "/images/dry2.jpg" },
        { tip: "Use a rich, emollient moisturizer twice daily.", image: "/images/dry3.jpg" },
        { tip: "Avoid hot showers, as they can dry out your skin.", image: "/images/dry4.jpg" },
        { tip: "Incorporate hyaluronic acid for extra hydration.", image: "/images/dry5.jpg" },
        { tip: "Choose gentle exfoliants to avoid skin irritation.", image: "/images/dry6.jpg" },
        { tip: "Apply a thick layer of moisturizer before bed.", image: "/images/dry7.jpg" },
        { tip: "Use a humidifier in your room during dry seasons.", image: "/images/dry8.jpg" },
        { tip: "Drink plenty of water to keep skin hydrated from within.", image: "/images/dry9.jpg" },
        { tip: "Avoid alcohol-based skincare products.", image: "/images/dry10.jpg" },
        { tip: "Use an oil-based cleanser to remove makeup.", image: "/images/dry11.jpg" },
        { tip: "Wear protective clothing in cold weather.", image: "/images/dry12.jpg" },
    ],
    "anti-aging": [
        { tip: "Incorporate retinoids to reduce fine lines and wrinkles.", image: "/images/antiaging1.jpg" },
        { tip: "Apply sunscreen daily to prevent premature aging.", image: "/images/antiaging2.jpg" },
        { tip: "Use a vitamin C serum to brighten the skin.", image: "/images/antiaging3.jpg" },
        { tip: "Stay hydrated for better skin elasticity.", image: "/images/antiaging4.jpg" },
        { tip: "Consider collagen-boosting supplements.", image: "/images/antiaging5.jpg" },
        { tip: "Apply a rich, nourishing moisturizer before bed.", image: "/images/antiaging6.jpg" },
        { tip: "Get plenty of sleep to allow skin repair.", image: "/images/antiaging7.jpg" },
        { tip: "Use an eye cream to address fine lines around the eyes.", image: "/images/antiaging8.jpg" },
        { tip: "Eat antioxidant-rich foods to support skin health.", image: "/images/antiaging9.jpg" },
        { tip: "Limit sugar intake, as it can cause glycation in the skin.", image: "/images/antiaging10.jpg" },
        { tip: "Use a gentle facial massage to stimulate circulation.", image: "/images/antiaging11.jpg" },
        { tip: "Incorporate peptides to help with firmness.", image: "/images/antiaging12.jpg" },
    ],
    "sensitive-skin": [
        { tip: "Choose fragrance-free and hypoallergenic products.", image: "/images/sensitive1.jpg" },
        { tip: "Avoid harsh exfoliants or physical scrubs.", image: "/images/sensitive2.jpg" },
        { tip: "Patch-test new products before full application.", image: "/images/sensitive3.jpg" },
        { tip: "Use products with soothing ingredients like aloe vera.", image: "/images/sensitive4.jpg" },
        { tip: "Avoid products with alcohol, which can irritate skin.", image: "/images/sensitive5.jpg" },
        { tip: "Apply a gentle, non-foaming cleanser.", image: "/images/sensitive6.jpg" },
        { tip: "Use a moisturizer designed for sensitive skin.", image: "/images/sensitive7.jpg" },
        { tip: "Limit sun exposure and apply mineral sunscreen.", image: "/images/sensitive8.jpg" },
        { tip: "Avoid frequent changes in your skincare routine.", image: "/images/sensitive9.jpg" },
        { tip: "Stay hydrated to support your skin's barrier function.", image: "/images/sensitive10.jpg" },
        { tip: "Use lukewarm water instead of hot water when washing.", image: "/images/sensitive11.jpg" },
        { tip: "Avoid artificial dyes and preservatives in products.", image: "/images/sensitive12.jpg" },
    ]
};

// Styled components for the flip card effect
const CardWrapper = styled(Box)({
    perspective: '1000px',
    width: '300px',
    height: '350px',
    animation: `${fadeInUp} 0.6s ease-out both`,
});

const FlipCard = styled(Box)({
    position: 'relative',
    width: '100%',
    height: '100%',
    transformStyle: 'preserve-3d',
    transition: 'transform 0.6s',
    '&:hover': {
        transform: 'rotateY(180deg)',
    },
});

const FlipCardInner = styled(Box)({
    position: 'relative',
    width: '100%',
    height: '100%',
    transformStyle: 'preserve-3d',
});

const FlipCardFront = styled(Card)({
    position: 'absolute',
    width: '100%',
    height: '100%',
    backfaceVisibility: 'hidden',
});

const FlipCardBack = styled(Card)({
    position: 'absolute',
    width: '100%',
    height: '100%',
    backfaceVisibility: 'hidden',
    transform: 'rotateY(180deg)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#38b593',
    color: 'white',
});

// Tips Component with Tabs and Flip Cards
const TipsWithTabs = () => {
    const [selectedCategory, setSelectedCategory] = useState("general");

    const handleTabChange = (event, newValue) => {
        setSelectedCategory(newValue);
    };

    return (
        <Box sx={{ width: '100%', textAlign: 'center' }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                <Tabs
                    value={selectedCategory}
                    onChange={handleTabChange}
                    centered
                    variant="scrollable"
                    scrollButtons="auto"
                    sx={{
                        '.MuiTabs-flexContainer': {
                            justifyContent: 'center',
                        },
                    }}
                >
                    {Object.keys(tipsData).map((category) => (
                        <Tab
                            key={category}
                            label={category.replace("-", " ").replace(/^\w/, (c) => c.toUpperCase())}
                            value={category}
                        />
                    ))}
                </Tabs>
            </Box>

            {/* Display Tips with Flip Cards for Selected Category */}
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, justifyContent: 'center', mt: 2 }}>
                {tipsData[selectedCategory].map((tip, index) => (
                    <CardWrapper key={index}>
                        <FlipCard>
                            <FlipCardInner>
                                <FlipCardFront>
                                    <CardMedia
                                        component="img"
                                        height="350"
                                        image={tip.image}
                                        alt="Skincare tip"
                                    />
                                </FlipCardFront>
                                <FlipCardBack>
                                    <CardContent>
                                        <Typography variant="h6" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                                            {tip.tip}
                                        </Typography>
                                    </CardContent>
                                </FlipCardBack>
                            </FlipCardInner>
                        </FlipCard>
                    </CardWrapper>
                ))}
            </Box>
        </Box>
    );
};

// Main General Page Component
const GeneralPage = () => {
    return (
        <Box>
            <MarqueeSwiper />
            <TipsWithTabs />
        </Box>
    );
};

export default GeneralPage;
