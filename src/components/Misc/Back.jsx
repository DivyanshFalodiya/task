import { ArrowBack } from "@mui/icons-material";
import { IconButton, Tooltip, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";

// Back Button Component
const Back = () => {
  const theme = useTheme();
  const navigation = useNavigate();

  // Go Back
  const goBack = () => {
    navigation("/", { replace: true });
  };

  return (
    <Tooltip
      title="Back"
      sx={{
        position: "absolute",
        zIndex: 1000,
        left: theme.spacing(2),
      }}
    >
      <IconButton onClick={goBack}>
        <ArrowBack color={theme.palette.primary.contrastText} />
      </IconButton>
    </Tooltip>
  );
};

export default Back;
