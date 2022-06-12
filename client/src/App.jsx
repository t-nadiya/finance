import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Container, CssBaseline, AppBar, Typography } from "@material-ui/core";
import { getTickers } from "./store/tickerState";
import { makeStyles } from "@material-ui/core/styles";
import Card from "./components/card/Card";
import List from "./components/list/List";

const useStyles = makeStyles({
  flex: {
    display: "flex",
    justifyContent: "space-between",
  },
  wrapper: {
    maxWidth: 1000,
    margin: "10px auto",
  },
  center: {
    alignSelf: "center",
  },
  header: {
    textAlign: "center",
  },
});

function App() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const date = new Date().toLocaleDateString("en-GB");

  useEffect(() => {
    dispatch(getTickers());
  }, [dispatch]);

  return (
    <div className={classes.wrapper}>
      <CssBaseline />
      <Typography variant="h3">NotFakeFinance</Typography>
      <AppBar position="static" elevation={0}>
        <Container className={`${classes.flex} ${classes.container}`}>
          <List />
          <Typography className={classes.center}>{date}</Typography>
        </Container>
      </AppBar>
      <Typography variant="h5" className={classes.header}>
        Watchlist
      </Typography>
      <Card />
    </div>
  );
}

export default App;
