import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardMedia,
  Grid,
  Typography,
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
  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Grid container display="flex" alignItems="center">
        <Grid item xs={12} sm={6} className={classes.gridItems}>
          <Link to="/view" className={classes.link}>
            <Card>
              <CardActionArea sx={{ p: 2 }}>
                <CardMedia
                  component={ViewList}
                  sx={{ height: 100, width: 100 }}
                />
                <Typography align="center" variant="h5">
                  View
                </Typography>
              </CardActionArea>
            </Card>
          </Link>
        </Grid>
        <Grid item xs={12} sm={6} className={classes.gridItems}>
          <Link to="/create" className={classes.link}>
            <Card>
              <CardActionArea sx={{ p: 2 }}>
                <CardMedia component={Edit} sx={{ height: 100, width: 100 }} />
                <Typography align="center" variant="h5">
                  Create
                </Typography>
              </CardActionArea>
            </Card>
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
