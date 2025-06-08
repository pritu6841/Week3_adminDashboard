import { useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import Tables from "./pages/Tables";
import Calendar from "./pages/Calendar";
import Kanban from "./pages/Kanban";
import Charts from "./pages/Charts";
import { styled } from "@mui/material/styles";
import { themes } from "./theme/themes";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

function App() {
  const [open, setOpen] = useState(true);
  const [currentTheme, setCurrentTheme] = useState("ocean");

  const theme = createTheme(themes[currentTheme]);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleThemeChange = (themeKey) => {
    setCurrentTheme(themeKey);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: "flex" }}>
        <Header
          open={open}
          toggleDrawer={toggleDrawer}
          currentTheme={currentTheme}
          onThemeChange={handleThemeChange}
        />
        <Sidebar open={open} />
        <Main open={open}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/tables" element={<Tables />} />
            <Route path="/charts" element={<Charts />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/kanban" element={<Kanban />} />
          </Routes>
        </Main>
      </Box>
    </ThemeProvider>
  );
}

export default App;
