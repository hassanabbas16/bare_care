"use client";
import { Box, Button, ButtonBase, ListItem, Paper, styled, Typography } from "@mui/material";

export const HomeTypography = styled(Typography)(({ theme }) => ({
    fontFamily: "Arial, sans-serif",
    fontSize: "1.5rem",
    //   fontWeight: "600",
    color: theme.palette.text.primary,
    textAlign: "center",
    padding: "1em",
}));

export const HomePkgsBox = styled(Box)(({ theme }) => ({
    fontSize: "1.6rem",
    padding: "5rem 0",
    display: "flex",
    justifyContent: "center",
    "& .MuiTypography-root": {
        fontSize: "1.6rem",
    },
}));

export const HomePkgsInBox = styled(Box)(({ theme }) => ({
    maxWidth: "1440px",
    width: "100%",
    display: "flex",
    flexWrap: "wrap",
    gap: "4rem",
    position: "relative",
}));

export const HomePkgBox = styled(Box)(({ theme, bg = null }) => ({
    display: "flex",
    gap: "2rem",
    flexDirection: "column",
    flexBasis: "calc(33% - 2.3rem)",

    // backgroundImage: `linear-gradient(to bottom right, #eeedebe5, #eeedebe5), url(${bg})`,
    // // backgroundBlendMode: "exclusion",
    // backgroundPosition: "center",
    // backgroundSize: "cover",
    // backgroundRepeat: "no-repeat",
}));

export const PkgImgCtr = styled(Box)(({ theme, img }) => ({
    width: "100%",
    height: "100%",
    background: `linear-gradient(to bottom, #00000080, #00000080), url(${img})`,
    // backgroundBlendMode: "screen",
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    "& img": {
        width: "100%",
        height: "100%",
        objectFit: "cover",
    },
}));

export const HomeBlueBanner = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "10rem",

    // backgroundRepeat: "repeat",
}));

export const HomeContainer = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    // backgroundImage: `radial-gradient(${
    //   theme.palette.mode === "dark"
    //     ? "rgba(255, 255, 255, 0.4)"
    //     : "rgba(0, 0, 0, 0.4)"
    // } 9%, transparent 9%)`,
    // backgroundPosition: "0% 0%",
    // backgroundSize: "50px 50px",
    // backgroundAttachment: "fixed",
}));

export const HomeBlueBtn = styled(Button)(({ theme }) => ({
    width: "100%",
    backgroundColor: "#80AECE",
    color: theme.palette.text.primary,
    padding: "1.5rem",
    fontSize: "2rem",
    marginBottom: "3rem",
    "&:hover": {
        backgroundColor: "#A0D7E4",
    },
}));

export const HomeBlueLink = styled(Typography)(({ theme }) => ({
    color: "#0c7fcf",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: "1.7rem !important",
    "&:hover": {
        textDecoration: "underline",
    },
}));

export const HomeCollageCtr = styled(Box)(({ theme }) => ({
    flexBasis: "calc(100%/5 - 3.2rem)",
    // backgroundColor: "red",
    height: "200px",
    "& img": {
        transition: "all 0.2s ease-in",
        width: "100%",
        height: "100%",
        objectFit: "cover",
    },
    "&:hover": {
        cursor: "pointer",
    },
    "&:hover img": {
        transform: "scale(1.05)",
    },
}));

export const HomeListItem = styled(ListItem)(({ theme }) => ({
    position: "relative",
    "&::before": {
        content: '"•"',
        position: "absolute",
        left: 0,
        top: "10px",
        color: theme.palette.primary.main,
        fontSize: "1.5rem",
        lineHeight: "1.5rem",
    },
}));

const PkgExtraHeading = styled(Typography)(({ theme }) => ({
    fontSize: "2rem !important",
    fontWeight: "bold",
    color: theme.palette.text.primary,
}));

const StyledBox4 = styled(Box)(({ theme }) => ({
    borderTop: theme.palette.mode === "light" ? "2px solid #000" : "2px solid #fff",
    backgroundColor: theme.palette.mode === "light" ? "#efefef" : "#212121",
    padding: "2rem",
}));

export const HomeHeroContainer = styled(Box)(({ theme }) => ({
    height: "calc(100vh + 7rem)",
    width: "100%",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    paddingTop: "25rem",
    alignItems: "center",
}));

export const HeroVideoContainer = styled(Box)(({ theme }) => ({
    position: "fixed",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    overflow: "hidden",
    zIndex: "-100",
    background: "rgba(0,0,0,0.3)",

    "&:after": {
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        background: `var(--overlay-${theme.palette.mode})`,
    },
}));

export const PackagesSection = styled(Box)(({ theme }) => ({
    fontSize: "1.6rem",
    // backgroundColor: theme.palette.primary.main,
    padding: "5rem 0",
    display: "flex",
    justifyContent: "center",
    "& .MuiTypography-root": {
        fontSize: "1.6rem",
    },
}));

export const SliderContainer = styled(Box)(({ theme }) => ({
    width: "100%",
    padding: "5rem 0",
    height: "90vh",
    textAlign: "center",
    overflow: "hidden",
    position: "relative",
}));

export const Slider = styled(Box)(({ theme }) => ({
    position: "absolute",
    width: "200px" /* Increased width */,
    height: "350px" /* Increased height */,
    top: "12%",
    left: "calc(50% - 100px)" /* Center the larger slider */,
    transformStyle: "preserve-3d",
    transform: "perspective(1000px) rotateX(-18deg)",
    animation: "autoRun 20s linear infinite",
    transition: "animation-play-state 0.5s ease",
    borderRadius: "20px",
    zIndex: 3,

    "&:hover": {
        animationPlayState: "paused",
    },
}));

export const SliderItem = styled(Box)(({ theme }) => ({
    position: "absolute",
    inset: "0 0 0 0",
    transform:
        "rotateY(calc((var(--position) - 1) * (360 / var(--quantity)) * 1deg)) translateZ(510px)" /* Increased translateZ value for a larger circle */,
    transition: "transform 0.5s ease",
    zIndex: 2,
    borderRadius: "20px",
    overflow: "hidden",
    backgroundColor: theme.palette.mode === "light" ? "rgba(255 255 255 / 31%)" : "rgba(16 18 27 / 40%)",
    backdropFilter: "blur(20px)",
    boxShadow: theme.palette.mode === "light" ? "0 0 10px rgba(0, 0, 0, 0.2)" : "0 0 10px rgba(255, 255, 255, 0.2)",

    // "& img": {
    //   width: "100%",
    //   height: "100%",
    //   objectFit: "cover",
    // },
}));

export const CardContainer = styled(Box)(({ theme }) => ({
    position: "relative",
    // left: "50%",
    // top: "65%",
    // transform: "translate(-50%, -50%)",
    width: "100%",
    // height: "100%",
    height: "700px",
    overflow: "hidden",
    // boxShadow: "0 0 2px 2px #dbdbdb",
    borderRadius: "20px",
}));

export const Cards = styled(Box)(({ theme }) => ({
    width: "max-content",
    mt: "5rem",
}));

export const Card = styled(Box)(({ theme }) => ({
    width: "280px",
    height: "160px",
    background: "linear-gradient(to bottom right, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.8)), var(--url)",
    backgroundPosition: "50% 50%",
    display: "inline-block",
    transition: "0.5s",
    backgroundSize: "cover",
    position: "absolute",
    zIndex: 1,
    top: "85%",
    transform: "translate(0,-60%)",
    borderRadius: "20px",
    boxShadow: "0 0px 15px 1px #505050",
    backgroundRepeat: "no-repeat",

    // This is the card content div
    "& div": {
        position: "absolute",
        top: "50%",
        left: "100px",
        // width: "450px",
        textAlign: "left",
        padding: 0,
        color: "#eee",
        transform: "translate(0, -50%)",
        display: "none",
    },
}));

export const CardName = styled(Typography)(({ theme }) => ({
    fontSize: "2.6rem",
    fontWeight: "500",
    opacity: 0,
    animation: "showContent 1s ease-in-out forwards",
    color: "#FFFFFF",
    marginBottom: "3rem",
}));

export const CardDesc = styled(Typography)(({ theme }) => ({
    fontSize: "1.6rem",
    fontWeight: "300",
    lineHeight: "210%",
    width: "70%",
    opacity: 0,
    animation: "showContent 1s ease-in-out 0.3s 1 forwards",
    display: "flex",
    alignItems: "center",
    color: "#FFFFFF",
}));

export const CardBtn = styled(Button)(({ theme }) => ({
    marginTop: "2rem",
    fontWeight: "500",
    opacity: 0,
    animation: "showContent 1s ease-in-out 0.6s 1 forwards",

    padding: "1rem 1.6rem",
    borderRadius: "12px",
    backgroundColor: "transparent",
    border: `1px solid ${theme.palette.primary.accent}`,
    "&:hover": {
        backgroundColor: theme.palette.primary.accent,
        color: "white",
        // border: "none",
    },
    color: "white",
    fontSize: "1.2rem !important",
}));

export const CardControls = styled(Typography)(({ theme }) => ({
    position: "absolute",
    bottom: "3rem",
    zIndex: 20,
    textAlign: "center",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    gap: "1rem",
}));

export const CardBtnNav = styled(Button)(({ theme }) => ({
    fontSize: "2rem !important",
    backgroundColor: "white",
    color: theme.palette.secondary.main,
    height: "5rem",
    width: "5rem",
    borderRadius: "50%",
    padding: 0,
    minWidth: "auto",

    "&:hover": {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
    },
}));

export const ServicesImgContainer = styled(Typography)(({ theme }) => ({
    textAlign: "center",
    position: "relative",
    flexBasis: "52.5%",

    "& .content": {
        content: "''",
        width: "100%",
        backgroundColor: "transparent",
        overflow: "hidden",
        clipPath: "polygon(100% 0, 100% 100%, 5% 100%, 5% 70%, 0 50%, 5% 30%, 5% 0)",
        maxHeight: "580px",

        "& svg": {
            "& path": {
                fill: theme.palette.primary.main,
            },
        },

        "& img": {
            width: "100%",
            height: "100%",
            objectFit: "cover",
        },
    },
}));

export const HomeServicesBox = styled(Box)(({ theme }) => ({
    padding: "5rem 0",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "3rem",
}));

export const SectionHeading = styled(Typography)(({ theme }) => ({
    fontSize: "4rem !important", // Default size for large screens
    fontWeight: "bold",
    position: "relative",
    zIndex: 2,
    animation: "showContent 1s ease-in-out 0.3s 1 forwards",
    margin: "2rem 0",
    [theme.breakpoints.down("sm")]: {
        fontSize: "4rem !important", // Size for small screens and below
    },
    [theme.breakpoints.down("xs")]: {
        fontSize: "3rem !important", // Size for extra-small screens
    },
}));

export const SectionHeadingCentered = styled(Typography)(({ theme }) => ({
    fontSize: "5.5rem !important",
    fontWeight: "bold",
    fontFamily: "BDSansBold",
    position: "relative",
    zIndex: 2,
    animation: "showContent 1s ease-in-out 0.3s 1 forwards",
    color: theme.palette.mode === "light" ? "#00111A" : "#fff",
    textAlign: "center",
    [theme.breakpoints.down("sm")]: {
        fontSize: "4rem !important",
        fontWeight: "bold",
        fontFamily: "BDSansBold !important",
    },
    [theme.breakpoints.down("xs")]: {
        fontSize: "3rem !important",
        fontWeight: "bold",
        fontFamily: "BDSansBold !important",
    },
}));

export const ServiceSubheading = styled(Typography)(({ theme, special = false }) => ({
    fontWeight: "400",
    color: special ? "#232E4A" : theme.palette.primary.contrastText,
    opacity: 0,
    animation: "showContent 1s ease-in-out 0.3s 1 forwards",
    margin: "3rem 0",
}));

export const ServicesDesc = styled(Typography)(({ theme }) => ({
    margin: "2rem 0",
    lineHeight: 1.5,
    fontSize: "2.5rem !important",
    color: "#aaa",
    "& .focus": {
        fontFamily: "JakartaSansBold",
    },
    "& span": {
        display: "block",
    },
    [theme.breakpoints.down("sm")]: {
        fontSize: "2rem !important", // For small screens
    },
    [theme.breakpoints.down("xs")]: {
        fontSize: "1.8rem !important", // For extra small screens
    },
}));

export const ServicesTagline = styled(Typography)(({ theme }) => ({
    margin: "2.5rem 0",
    lineHeight: 1.1,
    fontSize: "3.1rem !important",
    fontWeight: "bold",
    "& .focus": {
        fontFamily: "JakartaSansBold",
    },
    "& span": {
        display: "block",
    },
    [theme.breakpoints.down("sm")]: {
        fontSize: "2.5rem !important", // For small screens
    },
    [theme.breakpoints.down("xs")]: {
        fontSize: "2rem !important", // For extra small screens
    },
}));

export const ServicesBtn = styled(Button)(({ theme, special = false }) => ({
    fontSize: "2rem",
    fontWeight: "bold",
    padding: "1.6rem 3.2rem",
    borderRadius: "200px",
    backgroundColor: special ? theme.palette.primary.accent : "transparent",
    border: `1px solid ${theme.palette.primary.accent}`,
    "&:hover": {
        backgroundColor: special ? "transparent" : theme.palette.primary.accent,
        color: special ? theme.palette.primary.accent : "white",
    },
    color: special ? theme.palette.primary.contrastText : theme.palette.primary.accent,
    [theme.breakpoints.down("sm")]: {
        fontSize: "1.8rem", // For small screens
        padding: "1.4rem 3rem",
    },
    [theme.breakpoints.down("xs")]: {
        fontSize: "1.6rem", // For extra small screens
        padding: "1.2rem 2.8rem",
    },
}));

// export const ServicesItem = styled(Paper)(({ theme }) => ({
//   display: "flex",
//   flexDirection: "column",
//   alignItems: "center",
//   boxShadow: "none",
// }));

export const ServicesItem = styled(Paper)(({ theme }) => ({
    // padding: 16,
    textAlign: "center",
    display: "flex",
    width: "430px",
    height: "600px",
    flexDirection: "column",
    position: "relative",
    overflow: "hidden",
    borderRadius: "16px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",

    "&:hover": {
        "& .service__content": {
            bottom: 0,
        },
    },
}));

export const ServicesGrid = styled(Paper)(({ theme }) => ({
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    boxShadow: "none",
    gap: "2rem",
    backgroundColor: "transparent",
    backgroundImage: "none",
}));

export const ServiceContent = styled(Box)(({ theme }) => ({
    padding: "2rem 2rem",
    display: "flex",
    margin: "0 2rem",
    borderRadius: "16px 10px 0 0",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "space-between",
    flexBasis: "50%",
    backgroundColor: "rgba(255, 255, 255, 0.04)",
    border: "0.5px solid rgba(255, 255, 255, 0.11)",
    boxShadow: "0 0 6px 2px rgba(0, 0, 0, 0.1)",
    backdropFilter: "blur(14.4px)",
    minHeight: "500px",
    position: "absolute",
    bottom: "-66%",
    left: "0",
    right: "0",
    transition: "all 0.3s ease-in",
}));

export const ServiceName = styled(Typography)(({ theme }) => ({
    fontFamily: "Unbounded",
    textTransform: "uppercase",
    fontSize: "2.8rem !important",
    fontWeight: "600",
    color: theme.palette.primary.accent,
    textAlign: "left",
}));

export const ServiceCat = styled(Typography)(({ theme }) => ({
    fontFamily: "Unbounded",
    fontSize: "1.4rem !important",
    textAlign: "left",
    color: "white",
    fontWeight: "300",
}));

export const ServiceDetails = styled(Box)(({ theme }) => ({
    width: "100%",

    "& span": {
        display: "block",
    },
}));

export const ServiceDetailHeading = styled(Typography)(({ theme }) => ({
    fontFamily: "Unbounded !important",
    fontSize: "2.2rem !important",
    textAlign: "left",
    color: "white",
    fontWeight: "300",
}));

export const ServiceDetail = styled(Box)(({ theme }) => ({
    textAlign: "left",
    color: "white",
    marginBottom: "1rem",
    display: "flex",
    flexDirection: "column",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "flex-start",
    // color: theme.palette.primary.accent,

    "& .MuiBox-root": {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        "& .innerdeet": {
            display: "flex",
            justifyContent: "space-between",
            fontSize: "1.6rem !important",
            fontWeight: "300",
            marginBottom: "0.2rem",

            "& span": {
                fontWeight: "500",
            },

            // "&:before": {
            //   content: '"• "',
            // },
        },
    },
}));

export const ServiceBtn1 = styled(ButtonBase)(({ theme, special = false }) => ({
    fontFamily: "DMSans",
    backgroundColor: special ? theme.palette.primary.accentDark : "#131313",
    border: `1px solid ${special ? theme.palette.primary.accentDark : "rgba(218, 218, 218, 0.45)"}`,
    borderRadius: "1.2rem",
    padding: "1rem 2rem",
    fontSize: "1.4rem !important",
    color: "white",
    fontWeight: "regular",
    transition: "all 100ms ease-in-out",

    "&:hover ": {
        color: theme.palette.primary.main,
        backgroundColor: special ? theme.palette.primary.accent : "rgba(218, 218, 218, 0.45)",
    },
}));

export const ServiceBtn = styled(Button)(({ theme }) => ({
    fontSize: "2rem !important",
    textAlign: "left",
    display: "flex",
    gap: "1rem",
    // marginBottom: "3rem",
    borderRadius: 0,
    padding: "1rem 1.5rem",
    backgroundColor: theme.palette.primary.accent2,
    color: theme.palette.primary.accent,
    overflow: "hidden",

    "& .MuiBox-root": {
        position: "relative",
        overflow: "hidden",
        width: "20px",
        height: "20px",
    },

    "& svg": {
        position: "absolute",
        // top: 0,
        transition: "all 0.3s ease-in",

        "&:nth-of-type(1)": {
            left: "-100%",
        },

        "&:nth-of-type(2)": {
            left: "0%",
        },
    },

    "&:hover": {
        "& .MuiBox-root svg": {
            "&:nth-of-type(1)": {
                left: "0",
            },

            "&:nth-of-type(2)": {
                left: "100%",
            },
        },
    },
}));

export const Carousel = styled(Box)(({ theme }) => ({
    maxWidth: "70rem",
    overflow: "hidden",
    position: "relative",
}));

export const CarouselContentContainer = styled(Box)(({ theme }) => ({
    display: "flex",
    transition: "all 300ms ease-in-out",
    marginBottom: "8rem",
    // gap: "2rem",
}));

export const CarouselContentItem = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    transition: "all 300ms ease-in-out",
    padding: "1rem",
    height: "23rem",
    overflow: "hidden",
    backgroundColor: theme.palette.mode === "light" ? "rgba(255, 255, 255, 0.8)" : "rgba(0, 0, 0, 0.6)", // Light mode: minimal opacity; Dark mode: further reduced opacity
    "@media (max-width: 900px)": {
        height: "auto", // Ensure dynamic height for smaller screens
    },
}));

export const CarouselItemInner = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    transition: "all 300ms ease-in-out",
    padding: "4rem",
    borderRadius: "21px",
    boxShadow: "0 4px 4px 0 rgba(0, 0, 0, 0.25)",
    overflow: "hidden",
    height: "100%",
    backgroundColor: theme.palette.mode === "dark" ? "rgba(255,255,255,0.001)" : "#F9FAFB",
    border: `1px solid ${theme.palette.mode === "dark" ? "rgba(255,255,255,0.32)" : "white"}`,
    backdropFilter: "blur(14.4px)",
    "& h5": {
        fontSize: "2.3rem",
    },
    "& p": {
        fontSize: "1.8rem",
    },
    "@media (max-width: 900px)": {
        "& h5": {
            fontSize: "1.8rem",
        },
        "& p": {
            fontSize: "1.4rem",
        },
    },
}));

export const CarouselImg = styled(Box)(({ theme }) => ({
    border: `2px solid ${theme.palette.primary.accent}`,
    borderRadius: "50%",
    marginRight: "1rem",
    "@media (max-width: 900px)": {
        minHeight: "3.5rem",
        width: "3.5rem",
    },
}));

export const CarouselStarsBox = styled(Box)(({ theme, stars }) => ({
    display: "flex",
    marginBottom: "1.5rem",
    fontSize: "2rem",

    "& svg": {
        marginRight: "0.3rem",
        color: `${theme.palette.primary.accent2}`,

        "&.colorstar": {
            color: "gold",
        },
    },
    "@media (max-width: 900px)": {
        fontSize: "1.5rem", // Reduce star size on smaller screens
    },
}));

export const CarouselDetails = styled(Box)(({ theme }) => ({
    marginBottom: "2.6rem",
    textAlign: "left",
    fontSize: "1.8rem !important",

    // "& h5": {
    //   fontSize: "2.3rem",
    // },
    // "& p": {
    //   fontSize: "1.8rem !important",
    //   fontWeight: "400 !important",
    // },
    // "@media (max-width: 900px)": {
    //   "& h5": {
    //     fontSize: "1.8rem", // Set desktop title size
    //   },
    //   "& p": {
    //     fontSize: "1.4rem", // Set desktop description size
    //   },
    // },
}));

export const CarouselSignatures = styled(Box)(({ theme }) => ({
    display: "flex",
    // flexDirection: "column",
    alignItems: "center",
    marginTop: "auto",
    "@media (max-width: 900px)": {
        "& .MuiTypography-root": {
            fontSize: "1.5rem", // Reduce font size for client name and date
        },
    },
}));

export const CarouselName = styled(Typography)(({ theme }) => ({
    fontSize: "1.2rem !important",
    fontWeight: "400",
    // color: theme.palette.primary.accent,
    // lineHeight: "1.5",
    "@media (max-width: 900px)": {
        fontSize: "1.2rem !important", // Reduce font size for smaller screens
    },
}));

export const CarouselDate = styled(Typography)(({ theme }) => ({
    fontSize: "1rem !important",
    fontWeight: "400",
    color: theme.palette.mode === "dark" ? "#C6C6C6" : "#6D6D6D",
    "@media (max-width: 900px)": {
        fontSize: "1rem !important",
    },
}));

export const CarouselControls = styled(Box)(({ theme }) => ({
    position: "absolute",
    top: "40%",
    transform: "translateY(-50%)",
    width: "100%",
    zIndex: "3",
    display: "flex",
    justifyContent: "space-between",
}));

export const CarouselBtn = styled(Button)(({ theme }) => ({
    width: "2rem",
    height: "6rem",
    boxShadow: "none",
    "& svg": {
        filter: `brightness(0%) ${theme.palette.mode === "dark" ? "invert(1)" : "invert(0)"}`,
        height: "100%",
        width: "100%",
    },
}));



// export const BackgroundPkgImage = styled(Box)(({ theme }) => ({
//   position: "absolute",
//   top: 0,
//   left: 0,
//   width: "100%",
//   height: "100%",
//   backgroundImage: `url('/PackageBackImage.avif')`, // Path to your background image
//   backgroundSize: "cover", // Ensure the image covers the entire area without stretching
//   backgroundPosition: "center", // Center the image within the container
//   backgroundRepeat: "no-repeat", // Prevent repeating the image
//   zIndex: -1, // Place the background behind all other content
//   // Add any additional styling if needed, like:
//   // opacity: 0.5, // To make the image less prominent
// }));

export const PackageSliderWrapper = styled(Box)(({ theme }) => ({
    width: "100vw",
    height: "100vh",
    backgroundImage: "url(/packageimage.jpg)" /* Path to the image */,
    backgroundSize: "cover" /* Ensure the image covers the container */,
    backgroundPosition: "center" /* Center the image */,
    backgroundRepeat: "no-repeat" /* Prevent image from repeating */,
    backgroundAttachment: "fixed" /* Fix the background image */,
    padding: "20px 40px" /* Padding for the content */,
    display: "flex",
    alignItems: "start" /* Center content vertically */,
    justifyContent: "center" /* Center content horizontally */,
}));

export const ServicesOverviewWrapper = styled(Box)(({ theme }) => ({
    // padding: "20px 40px" /* Padding for the content */,

    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "transparent",
}));

export const HomeWrapper = styled(Box)(({ theme }) => ({
    padding: "34px 40px",
    maxWidth: "1440px",
    margin: "auto",
}));

export const Badge = styled(Typography)(({ theme }) => ({
    backgroundColor: theme.palette.primary.accent,
    color: "white",
    padding: "8px 16px",
    borderRadius: "12px",
    fontSize: "1rem",
    fontWeight: "300",
    display: "inline-block",
    height: "100%",
    marginLeft: "16px",
    fontFamily: "DMSans"
}));