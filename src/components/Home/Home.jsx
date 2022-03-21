import {
  Card,
  CardActionArea,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  gridItems: {
    padding: theme.spacing(5),
  },
}));

// Home Page
const Home = () => {
  const classes = useStyles();
  return (
    <Container
      sx={{
        width: "100vw",
        minHeight: "100vh",
      }}
    >
      <Grid container sx={{ height: "100%" }}>
        <Grid item xs={12} sm={6}>
          <Card>
            <CardActionArea>
              <Typography>VIEW</Typography>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card>
            <CardActionArea>
              <Typography>CREATE</Typography>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
