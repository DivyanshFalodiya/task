import { Lightbulb } from "@mui/icons-material";
import { Box, IconButton, Tooltip, useTheme } from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import { useContext } from "react";
import { ThemeModeContext } from "../../context/ThemeModeContext";

// Theme Change Component
const Theme = () => {
  const theme = useTheme();
  const [mode, changeMode] = useContext(ThemeModeContext);
  const titles = {
    light: {
      invText: "Dark Theme",
      invColor: deepOrange[500],
    },
    dark: {
      invText: "Light Theme",
      invColor: "yellow",
    },
  };
  return (
    <Box
      position="fixed"
      sx={{ top: theme.spacing(2), right: theme.spacing(2) }}
    >
      <Tooltip title={titles[mode].invText}>
        <IconButton onClick={changeMode}>
          <Lightbulb sx={{ color: titles[mode].invColor }} />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default Theme;
