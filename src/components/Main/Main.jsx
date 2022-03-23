import "./Main.css";
import {
  Box,
  Container,
  createTheme,
  GlobalStyles,
  ThemeProvider,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { useContext } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { ThemeModeContext } from "../../context/ThemeModeContext";
import Create from "../Create/Create";
import Home from "../Home/Home";
import Theme from "../Theme/Theme";
import View from "../View/View";

// Main Component
const MainComponent = () => {
  const [mode, changeMode] = useContext(ThemeModeContext);
  const location = useLocation();

  // Set up the theme
  const theme = createTheme({
    palette: {
      mode: mode,
      background: {
        paper: mode === "light" ? grey[300] : grey[900],
        default: mode === "light" ? grey[100] : "#121212",
      },
    },
  });

  // Routes with components
  const routes = [
    { path: "/", Component: Home },
    { path: "/view", Component: View },
    { path: "/create", Component: Create },
  ];

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles
        styles={{
          "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
            backgroundColor: theme.palette.background.default,
            width: 10,
            height: 8,
          },
          "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
            backgroundColor: mode === "light" ? grey[400] : grey[700],
            borderRadius: 10,
          },
          "&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus":
            {
              backgroundColor: mode === "light" ? grey[500] : grey[800],
            },
          "&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover":
            {
              backgroundColor: mode === "light" ? grey[500] : grey[800],
            },
        }}
      />
      <Box
        width="100vw"
        height="100vh"
        position="fixed"
        sx={{
          background: theme.palette.background.default,
          zIndex: -1,
          top: 0,
          left: 0,
        }}
      />

      <Theme />

      <Container
        sx={{
          height: "100%",
          minHeight: "100vh",
          padding: theme.spacing(2),
          paddingTop: theme.spacing(3),
          paddingBottom: theme.spacing(3),
        }}
      >
        <TransitionGroup component={null}>
          <CSSTransition key={location.key} timeout={500} classNames="fade">
            <Routes location={location}>
              {routes.map(({ path, Component }, index) => (
                <Route key={index} path={path} element={<Component />} />
              ))}
            </Routes>
          </CSSTransition>
        </TransitionGroup>
      </Container>
    </ThemeProvider>
  );
};

export default MainComponent;
