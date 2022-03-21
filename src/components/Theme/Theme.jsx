import { Lightbulb } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import { useContext } from "react";
import { ThemeModeContext } from "../../context/ThemeModeContext";

// Theme Change Component
const Theme = () => {
  const [mode, changeMode] = useContext(ThemeModeContext);
  return (
    <Box>
      <IconButton onClick={changeMode}>
        <Lightbulb />
      </IconButton>
    </Box>
  );
};

export default Theme;
