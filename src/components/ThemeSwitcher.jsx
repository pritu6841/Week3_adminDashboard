import { useState } from "react";
import {
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Box,
} from "@mui/material";
import PaletteIcon from "@mui/icons-material/Palette";
import { themes } from "../theme/themes";

const ThemeSwitcher = ({ currentTheme, onThemeChange }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleThemeSelect = (themeKey) => {
    onThemeChange(themeKey);
    // Dynamically set CSS variables for background gradient
    const palette = themes[themeKey].palette;
    if (palette.gradientStart && palette.gradientEnd) {
      document.body.style.setProperty(
        "--bg-gradient-start",
        palette.gradientStart
      );
      document.body.style.setProperty(
        "--bg-gradient-end",
        palette.gradientEnd
      );
    }
    handleClose();
  };

  return (
    <Box>
      <IconButton color="inherit" onClick={handleClick} sx={{ ml: 1 }}>
        <PaletteIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {Object.entries(themes).map(([key, theme]) => (
          <MenuItem
            key={key}
            onClick={() => handleThemeSelect(key)}
            selected={currentTheme === key}
          >
            <ListItemIcon>
              <Box
                sx={{
                  width: 20,
                  height: 20,
                  borderRadius: "50%",
                  bgcolor: theme.palette.primary.main,
                  border:
                    currentTheme === key
                      ? "2px solid #ffd700"
                      : "1px solid #ccc",
                }}
              />
            </ListItemIcon>
            <ListItemText>{theme.name}</ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default ThemeSwitcher;
