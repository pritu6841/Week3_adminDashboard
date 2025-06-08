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

const drawerWidth = 280;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(4),
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    width: `calc(100% - ${drawerWidth}px)`,
    ...(open && {
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
    backgroundColor: theme.palette.background.default,
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
  })
);

const AppContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  minHeight: "100vh",
  backgroundColor: theme.palette.background.default,
}));

function App() {
  const [open, setOpen] = useState(true);
  const [currentTheme, setCurrentTheme] = useState("dark");

  const theme = createTheme({
    ...themes[currentTheme],
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            scrollbarWidth: "thin",
            "&::-webkit-scrollbar": {
              width: "6px",
              height: "6px",
            },
            "&::-webkit-scrollbar-track": {
              background: themes[currentTheme].palette.background.default,
            },
            "&::-webkit-scrollbar-thumb": {
              background: themes[currentTheme].palette.divider,
              borderRadius: "3px",
            },
          },
        },
      },
    },
  });

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleThemeChange = (themeKey) => {
    setCurrentTheme(themeKey);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppContainer>
        <Header
          open={open}
          currentTheme={currentTheme}
          onThemeChange={handleThemeChange}
        />
        <Sidebar open={open} />
        <Main open={open}>
          <Box sx={{ flex: 1, maxWidth: "1600px", width: "100%", mx: "auto" }}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/tables" element={<Tables />} />
              <Route path="/charts" element={<Charts />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/kanban" element={<Kanban />} />
            </Routes>
          </Box>
        </Main>
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;
