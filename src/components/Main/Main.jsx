import { Box, createTheme, Paper, ThemeProvider } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeModeContext } from "../../context/ThemeModeContext";
import Create from "../Create/Create";
import Home from "../Home/Home";
import Theme from "../Theme/Theme";
import View from "../View/View";

// Main Component
const MainComponent = () => {
  const [mode, changeMode] = useContext(ThemeModeContext);

  // Set up the theme
  const theme = createTheme({
    palette: {
      mode: mode === "light" ? "light" : "dark",
      background: {
        paper: mode === "light" ? grey[200] : grey[900],
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
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
      ></Box>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/view" element={<View />} />
          <Route path="/create" element={<Create />} />
        </Routes>
      </BrowserRouter>
      <Theme />
    </ThemeProvider>
  );
};

export default MainComponent;
