import { AppBar, Toolbar, IconButton, Typography, Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ThemeSwitcher from "./ThemeSwitcher";

const Header = ({ open, toggleDrawer, currentTheme, onThemeChange }) => {
  return (
    <AppBar
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={toggleDrawer}
          edge="start"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          Admin Dashboard
        </Typography>
        <Box>
          <ThemeSwitcher
            currentTheme={currentTheme}
            onThemeChange={onThemeChange}
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
