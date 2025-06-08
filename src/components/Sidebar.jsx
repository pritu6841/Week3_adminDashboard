import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Divider,
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  TableChart as TableIcon,
  BarChart as ChartIcon,
  CalendarMonth as CalendarIcon,
  ViewKanban as KanbanIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;

const menuItems = [
  { text: "Dashboard", icon: <DashboardIcon />, path: "/" },
  { text: "Tables", icon: <TableIcon />, path: "/tables" },
  { text: "Charts", icon: <ChartIcon />, path: "/charts" },
  { text: "Calendar", icon: <CalendarIcon />, path: "/calendar" },
  { text: "Kanban", icon: <KanbanIcon />, path: "/kanban" },
];

const Sidebar = ({ open }) => {
  const navigate = useNavigate();

  return (
    <Drawer
      variant="persistent"
      open={open}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
    >
      <Toolbar />
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem button key={item.text} onClick={() => navigate(item.path)}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
