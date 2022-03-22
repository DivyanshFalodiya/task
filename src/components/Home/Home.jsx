import { Box, Button, Container, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Add, ViewList } from "@mui/icons-material";
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
  return (
    <>
      <Grid
        container
        display="flex"
        alignItems="center"
        sx={{ height: "100%" }}
      >
        <Grid item xs={12} sm={6} className={classes.gridItems}>
          <Link to="/view" className={classes.link}>
            <Button variant="contained" startIcon={<ViewList />}>
              View
            </Button>
          </Link>
        </Grid>
        <Grid item xs={12} sm={6} className={classes.gridItems}>
          <Link to="/create" className={classes.link}>
            <Button variant="contained" startIcon={<Add />}>
              Create
            </Button>
          </Link>
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
