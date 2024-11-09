import { Box, Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar } from "@mui/material";
import QuizIcon from "@mui/icons-material/Quiz";
import SpaIcon from "@mui/icons-material/Spa";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ArticleIcon from "@mui/icons-material/Article"; // Icon for Blogs

const Sidebar = ({ drawerOpen, toggleDrawer, handleTabChange }) => {
    const tabs = [
        { text: "Skin Quiz", icon: <QuizIcon /> },
        { text: "Recommendations", icon: <SpaIcon /> },
        { text: "Tips", icon: <LightbulbIcon /> },
        { text: "Wishlist", icon: <FavoriteIcon /> },
        { text: "Blogs", icon: <ArticleIcon /> }, // New Blogs Tab
    ];

    return (
        <Drawer
            variant="permanent"
            open={drawerOpen}
            sx={{
                width: drawerOpen ? 240 : 60,
                flexShrink: 0,
                "& .MuiDrawer-paper": {
                    width: drawerOpen ? 240 : 60,
                    boxSizing: "border-box",
                    transition: "width 0.3s ease",
                    overflowX: "hidden",
                },
            }}
        >
            <Toolbar />
            <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
                    <List>
                        {tabs.map((item) => (
                            <ListItem
                                button
                                key={item.text}
                                onClick={() => handleTabChange(item.text)}
                                sx={{
                                    borderRadius: "8px",
                                    "&:hover": {
                                        backgroundColor: "rgba(0, 0, 255, 0.1)",
                                    },
                                    marginBottom: 1,
                                    justifyContent: drawerOpen ? "flex-start" : "center",
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        justifyContent: "center",
                                        minWidth: drawerOpen ? "auto" : "unset",
                                        marginRight: drawerOpen ? 2 : 0,
                                    }}
                                >
                                    {item.icon}
                                </ListItemIcon>
                                {drawerOpen && (
                                    <ListItemText primary={item.text} sx={{ fontSize: "1.2rem", fontWeight: 600 }} />
                                )}
                            </ListItem>
                        ))}
                    </List>
                </Box>
                <Divider sx={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }} />
            </Box>
        </Drawer>
    );
};

export default Sidebar;
