import React, { useState } from "react";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
  styled,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import {
  ExitToAppOutlined,
  MenuOutlined,
  PersonOutlined,
  ArrowDropDown as ArrowDropDownIcon,
  CloseOutlined,
} from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../store/authSlice";
import { logoutAsync } from "../store/userApiSlice";

// Custom styled Button for Navigation
const NavigationButton = styled(Button)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontWeight: 500,
  textTransform: "capitalize",
  borderRadius: "20px", // Adjust the radius as per your design
  transition: "color 0.3s ease-out",
  "&:hover": {
    color: theme.palette.primary.dark,
    backgroundColor: "transparent",
  },
}));

const Navbar = () => {
  const theme = useTheme();
  const isMdDevices = useMediaQuery("(max-width:768px)");
  const isXsDevices = useMediaQuery("(max-width:466px)");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userInfo = useSelector((state) => state.auth.userInfo);
  const [anchorEl, setAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    dispatch(logoutAsync());
    dispatch(logout());
    navigate("/");
  };

  const handleSignIn = () => {
    navigate("/login");
  };

  const handleProfile = () => {
    navigate("/profile");
  };

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  // Scroll to a section on the same page
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const renderMenuItems = () => (
    <>
      <MenuItem onClick={() => scrollToSection("home")}>Home</MenuItem>
      <MenuItem onClick={() => scrollToSection("services")}>Services</MenuItem>
      <MenuItem onClick={() => scrollToSection("pricing")}>Pricing</MenuItem>
      <MenuItem onClick={() => scrollToSection("contact")}>Contact</MenuItem>
      <MenuItem onClick={() => scrollToSection("appFooter")}>
        AppFooter
      </MenuItem>
    </>
  );

  return (
    <AppBar position="static" sx={{ boxShadow: "none", bgcolor: "#ffffff" }}>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: "0 16px",
        }}
      >
        {isMdDevices && (
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
            sx={{
              display: { xs: "block", md: "none" },
              color: theme.palette.primary.main, // Set icon color here
            }}
          >
            <MenuOutlined />
          </IconButton>
        )}

        <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
          <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
          >
            <List>
              <ListItem button onClick={() => scrollToSection("home")}>
                <ListItemText primary="Home" />
              </ListItem>
              <ListItem button onClick={() => scrollToSection("services")}>
                <ListItemText primary="Services" />
              </ListItem>
              <ListItem button onClick={() => scrollToSection("pricing")}>
                <ListItemText primary="Pricing" />
              </ListItem>
              <ListItem button onClick={() => scrollToSection("contact")}>
                <ListItemText primary="Contact" />
              </ListItem>
              <ListItem button onClick={() => scrollToSection("appFooter")}>
                <ListItemText primary="AppFooter" />
              </ListItem>
              {userInfo ? (
                <>
                  <ListItem button onClick={handleProfile}>
                    <ListItemText primary="Profile" />
                  </ListItem>
                  <ListItem button onClick={handleLogout}>
                    <ListItemText primary="Logout" />
                  </ListItem>
                </>
              ) : (
                <ListItem button onClick={handleSignIn}>
                  <ListItemText primary="Sign In" />
                </ListItem>
              )}
            </List>
          </Box>
        </Drawer>

        {!isMdDevices && (
          <Box display="flex" alignItems="center" gap={2}>
            <NavigationButton
              onClick={() => scrollToSection("home")}
              variant="outlined"
              color="primary"
            >
              Home
            </NavigationButton>

            <NavigationButton
              onClick={() => scrollToSection("services")}
              variant="outlined"
              color="primary"
            >
              Services
            </NavigationButton>
            <NavigationButton
              onClick={() => scrollToSection("pricing")}
              variant="outlined"
              color="primary"
            >
              Pricing
            </NavigationButton>
            <NavigationButton
              onClick={() => scrollToSection("contact")}
              variant="outlined"
              color="primary"
            >
              Contact
            </NavigationButton>
            <NavigationButton
              onClick={() => scrollToSection("appFooter")}
              variant="outlined"
              color="primary"
            >
              AppFooter
            </NavigationButton>
          </Box>
        )}

        <Box display="flex" alignItems="center">
          {userInfo ? (
            <IconButton onClick={handleMenuOpen}>
              {userInfo.avatar ? (
                <Avatar src={userInfo.avatar} alt={userInfo.fullName} />
              ) : (
                <Avatar>
                  <Typography variant="body1">
                    {userInfo.fullName.charAt(0).toUpperCase()}
                  </Typography>
                </Avatar>
              )}
              <ArrowDropDownIcon />
            </IconButton>
          ) : (
            <Button variant="outlined" color="primary" onClick={handleSignIn}>
              Sign In
            </Button>
          )}

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
          >
            {userInfo && (
              <>
                <MenuItem onClick={handleProfile}>
                  Profile
                  <PersonOutlined />
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  Logout
                  <ExitToAppOutlined />
                </MenuItem>
              </>
            )}
          </Menu>
        </Box>

        {isMdDevices && (
          <IconButton
            onClick={toggleDrawer(false)}
            sx={{ display: { xs: "block", md: "none" } }}
          ></IconButton>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
