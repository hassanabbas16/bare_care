// components/CallToActionBox.jsx
"use client";
import {
    CTAContainer,
    CTAContentBox,
    CTAHeading,
    CTADescription,
    CTAInnerBox,
    CTAButton,
    CTAImage,
} from "../mui/CallToActionPkgs";

const CallToActionBox = ({ hideImage = false }) => {
    return (
        <CTAContainer>
            <CTAContentBox>
                <CTAHeading>Find Your Perfect Skincare Routine!</CTAHeading>

                <CTADescription sx={{ maxWidth: "70%", margin: "0 auto" }}>
                    Take our personalized skin quiz to unlock the best products and routines tailored specifically for your skin type
                    and concerns. Whether you struggle with acne, dryness, or sensitivity, we’ll provide recommendations designed to
                    help you achieve and maintain healthy, glowing skin. It’s fast, easy, and takes the guesswork out of skincare!
                </CTADescription>

                <CTAInnerBox>
                    <CTAButton
                        variant="contained"
                        onClick={() => (window.location.href = "/dashboard")}
                    >
                        Start the Quiz
                    </CTAButton>
                </CTAInnerBox>
            </CTAContentBox>
        </CTAContainer>
    );
};

export default CallToActionBox;
