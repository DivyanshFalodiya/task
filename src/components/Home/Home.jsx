import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardMedia,
  Grid,
  Typography,
  useTheme,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Add, Edit, ViewList } from "@mui/icons-material";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  gridItems: {
    padding: theme.spacing(3),
    display: "flex",
    justifyContent: "center",
  },
  cardActions: {
    padding: theme.spacing(2),
  },
  link: {
    textDecoration: "none",
  },
}));

// Home Page
const Home = () => {
  const classes = useStyles();
  const theme = useTheme();

  // Helpers
  const cards = [
    { path: "/view", text: "View", Icon: ViewList },
    { path: "/create", text: "Create", Icon: Edit },
  ];

  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      <Typography
        align="center"
        variant="h3"
        color={theme.palette.text.primary}
        sx={{ fontFamily: "Montserrat, Roboto, sans-serif" }}
      >
        UNOMOK
      </Typography>
      <Grid
        container
        display="flex"
        alignItems="center"
        sx={{ mt: theme.spacing(5) }}
      >
        {cards.map((c, i) => (
          <Grid key={i} item xs={12} sm={6} className={classes.gridItems}>
            <Link to={c.path} className={classes.link}>
              <Card
                sx={{
                  background: theme.palette.background.default,
                  border: `1px solid ${theme.palette.divider}`,
                }}
              >
                <CardActionArea sx={{ p: 2 }}>
                  <CardMedia
                    component={c.Icon}
                    sx={{ height: 100, width: 100 }}
                  />
                  <Typography align="center" variant="h5">
                    {c.text}
                  </Typography>
                </CardActionArea>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Home;
