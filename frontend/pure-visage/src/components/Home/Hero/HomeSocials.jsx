import { Box, IconButton } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import { useTheme } from "../../../contexts/themeContext";
import YouTubeIcon from "@mui/icons-material/YouTube";

const HomeSocialsBox = () => {
    const { theme } = useTheme();

    return (
        <Box
            sx={{
                position: "absolute",
                right: "2rem",
                bottom: "2rem",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "1rem",
                zIndex: 1000,
            }}
        >
            <IconButton
                sx={{
                    color: "white",
                    "& svg": {
                        fontSize: "3rem !important",
                    },
                    "&:hover": {
                        color: theme.palette.primary.main,
                    },
                }}
            >
                <FacebookIcon fontSize="large" />
            </IconButton>
            <IconButton
                sx={{
                    color: "white",
                    "& svg": {
                        fontSize: "3rem !important",
                    },
                    "&:hover": {
                        color: theme.palette.primary.main,
                    },
                }}
            >
                <InstagramIcon fontSize="inherit" />
            </IconButton>
            <IconButton
                sx={{
                    color: "white",
                    "& svg": {
                        fontSize: "3rem !important",
                    },
                    "&:hover": {
                        color: theme.palette.primary.main,
                    },
                }}
            >
                <TwitterIcon />
            </IconButton>
            <IconButton
                sx={{
                    color: "white",
                    "& svg": {
                        fontSize: "3rem !important",
                    },
                    "&:hover": {
                        color: theme.palette.primary.main,
                    },
                }}
            >
                <YouTubeIcon fontSize="inherit" />
            </IconButton>
        </Box>
    );
};

export default HomeSocialsBox;
