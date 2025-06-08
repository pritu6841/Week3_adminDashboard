import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Menu,
  MenuItem,
  Avatar,
  Badge,
  Tooltip,
  useTheme,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import {
  Notifications as NotificationsIcon,
  Settings as SettingsIcon,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { themes } from "../theme/themes";

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  width: "100%",
  left: 0,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  backgroundColor: theme.palette.background.paper,
  boxShadow: "none",
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

const Header = ({ open, currentTheme, onThemeChange }) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [notificationsAnchorEl, setNotificationsAnchorEl] =
    React.useState(null);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNotificationsMenuOpen = (event) => {
    setNotificationsAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setNotificationsAnchorEl(null);
  };

  return (
    <StyledAppBar position="fixed" open={open}>
      <Toolbar sx={{ justifyContent: "space-between", px: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ fontWeight: 600 }}
          >
            Admin Dashboard
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <FormControl size="small" sx={{ minWidth: 140 }}>
            <InputLabel id="theme-select-label">Theme</InputLabel>
            <Select
              labelId="theme-select-label"
              id="theme-select"
              value={currentTheme}
              label="Theme"
              onChange={(e) => onThemeChange(e.target.value)}
            >
              {Object.keys(themes).map((key) => (
                <MenuItem key={key} value={key}>
                  {themes[key].name || key}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Tooltip title="Notifications">
            <span>
              <Badge badgeContent={4} color="error">
                <NotificationsIcon
                  sx={{ cursor: "pointer" }}
                  onClick={handleNotificationsMenuOpen}
                />
              </Badge>
            </span>
          </Tooltip>

          <Tooltip title="Settings">
            <span>
              <SettingsIcon sx={{ cursor: "pointer" }} />
            </span>
          </Tooltip>

          <Tooltip title="Account settings">
            <span>
              <Avatar
                onClick={handleProfileMenuOpen}
                sx={{
                  width: 32,
                  height: 32,
                  bgcolor: theme.palette.primary.main,
                  ml: 2,
                  cursor: "pointer",
                }}
              >
                A
              </Avatar>
            </span>
          </Tooltip>
        </Box>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <Box
            sx={{
              px: 2,
              py: 1.5,
              display: "flex",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Avatar
              sx={{
                width: 48,
                height: 48,
                bgcolor: theme.palette.primary.main,
              }}
            >
              A
            </Avatar>
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                Alex Johnson
              </Typography>
              <Typography variant="body2" color="text.secondary">
                alex.johnson@email.com
              </Typography>
            </Box>
          </Box>
          <Box sx={{ my: 1 }}>
            <hr style={{ border: 0, borderTop: "1px solid #eee" }} />
          </Box>
          <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
          <MenuItem onClick={handleMenuClose}>My account</MenuItem>
          <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
        </Menu>

        <Menu
          anchorEl={notificationsAnchorEl}
          open={Boolean(notificationsAnchorEl)}
          onClose={handleMenuClose}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem onClick={handleMenuClose}>
            <Typography variant="body2">New message from John</Typography>
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <Typography variant="body2">Meeting reminder</Typography>
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <Typography variant="body2">Task deadline approaching</Typography>
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <Typography variant="body2">System update available</Typography>
          </MenuItem>
        </Menu>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Header;
