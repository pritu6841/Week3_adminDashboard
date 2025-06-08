import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Divider,
  Typography,
  useTheme,
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  TableChart as TableIcon,
  CalendarMonth as CalendarIcon,
  ViewKanban as KanbanIcon,
  BarChart as ChartIcon,
  Settings as SettingsIcon,
  Person as PersonIcon,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";

const drawerWidth = 280;

const StyledDrawer = styled(Drawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
  }),
  ...(!open && {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  }),
}));

const DrawerHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(2),
  justifyContent: "center",
  minHeight: 64,
}));

const StyledListItemButton = styled(ListItemButton)(({ theme, active }) => ({
  margin: theme.spacing(0.5, 1),
  borderRadius: theme.spacing(1),
  ...(active && {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
    },
    "& .MuiListItemIcon-root": {
      color: theme.palette.primary.contrastText,
    },
  }),
}));

const menuItems = [
  { text: "Dashboard", icon: <DashboardIcon />, path: "/" },
  { text: "Tables", icon: <TableIcon />, path: "/tables" },
  { text: "Calendar", icon: <CalendarIcon />, path: "/calendar" },
  { text: "Kanban", icon: <KanbanIcon />, path: "/kanban" },
  { text: "Charts", icon: <ChartIcon />, path: "/charts" },
];

const bottomMenuItems = [
  { text: "Profile", icon: <PersonIcon />, path: "/profile" },
  { text: "Settings", icon: <SettingsIcon />, path: "/settings" },
];

const Sidebar = ({ open }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();

  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <StyledDrawer variant="permanent" open={open}>
      <DrawerHeader>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            color: theme.palette.primary.main,
            display: open ? "block" : "none",
          }}
        >
          ADMIN
        </Typography>
      </DrawerHeader>
      <Divider />
      <List sx={{ px: 1, py: 2 }}>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding sx={{ display: "block" }}>
            <StyledListItemButton
              active={isActive(item.path)}
              onClick={() => navigate(item.path)}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                sx={{ opacity: open ? 1 : 0 }}
              />
            </StyledListItemButton>
          </ListItem>
        ))}
      </List>
      <Box sx={{ flexGrow: 1 }} />
      <Divider />
      <List sx={{ px: 1, py: 2 }}>
        {bottomMenuItems.map((item) => (
          <ListItem key={item.text} disablePadding sx={{ display: "block" }}>
            <StyledListItemButton
              active={isActive(item.path)}
              onClick={() => navigate(item.path)}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                sx={{ opacity: open ? 1 : 0 }}
              />
            </StyledListItemButton>
          </ListItem>
        ))}
      </List>
    </StyledDrawer>
  );
};

export default Sidebar;
