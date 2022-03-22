import { Box, Grid, Typography, useTheme } from "@mui/material";

// View Page
const View = () => {
  const theme = useTheme();
  return (
    <Box>
      <Typography
        variant="h5"
        align="center"
        color={theme.palette.text.primary}
      >
        View Users
      </Typography>
    </Box>
  );
};

export default View;
