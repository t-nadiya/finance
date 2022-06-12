import { useSelector } from "react-redux";
import {
  makeStyles,
  Paper,
  Typography,
  Button,
  Tooltip,
} from "@material-ui/core";
import AddIcon from "@mui/icons-material/Add";

import { io } from "socket.io-client";

const useStyles = makeStyles({
  flex: {
    display: "flex",
    justifyContent: "flex-start",
  },
  card: {
    width: 120,
    height: 50,
    margin: 5,
    padding: 15,
    backgroundColor: "#4D4C7D",
  },
  text: {
    fontSize: 15,
    margin: "auto",
  },
});

function List() {
  const classes = useStyles();
  const list = useSelector((state) => state.tickers?.tickers);

  const socket = io.connect("http://localhost:4000");
  function displayTicker(tickerName) {
    socket.emit("display", tickerName);
  }
  return (
    <div className={classes.flex} data-testid="smallCard">
      {list?.map((item) => (
        <Paper
          key={item.ticker}
          className={`${classes.flex} ${classes.card}`}
          elevation={5}
        >
          <Typography className={classes.text}>{item.ticker}</Typography>
          <Tooltip title="Add to watchlist">
            <Button
              onClick={() => displayTicker(item.ticker)}
              data-testid="button"
            >
              <AddIcon />
            </Button>
          </Tooltip>
        </Paper>
      ))}
    </div>
  );
}

export default List;
