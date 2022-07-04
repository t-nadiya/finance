import { useSelector } from "react-redux";
import { removeTicker } from "../../service"
import {
  Typography,
  makeStyles,
  Paper,
  Button,
  Tooltip,
} from "@material-ui/core";
import RemoveIcon from "@mui/icons-material/Remove";

const useStyles = makeStyles({
  flex: {
    display: "flex",
    justifyContent: "space-between",
  },
  card: {
    width: 700,
    margin: "15px auto",
    padding: 10,
    backgroundColor: "#4D4C7D",
  },
  caption: {
    fontWeight: 700,
  },
  increased: {
    color: "#00FFAB",
  },
  decreased: {
    color: "#F73D93",
  },
});

function Card() {
  const classes = useStyles();
  const tickersToDisplay = useSelector(
    (state) => state.tickers?.tickersToDisplay
  );

  return (
    <div data-testid="card">
      {tickersToDisplay?.map((item) => (
        <Paper key={item.ticker} className={classes.card} elevation={5}>
          <div className={classes.flex}>
            <div>
              <Typography className={classes.caption}>{item.ticker}</Typography>
              <Typography>${item.price}</Typography>
            </div>
            <div>
              <Typography
                className={
                  item.change > 0 ? classes.increased : classes.decreased
                }
              >
                {item.change}$
              </Typography>
              <Typography
                className={
                  item.change_percent > 0
                    ? classes.increased
                    : classes.decreased
                }
              >
                ({item.change_percent}%)
              </Typography>
            </div>
            <div>
              <Typography>
                <span>dividend</span> {item.dividend}
              </Typography>
              <Typography>
                <span>yield</span> {item.yield}%
              </Typography>
            </div>
            <Tooltip title="Remove from watchlist">
              <Button
                onClick={() => {
                  removeTicker(item.ticker);
                }}
                data-testid="button"
              >
                <RemoveIcon />
              </Button>
            </Tooltip>
          </div>
        </Paper>
      ))}
    </div>
  );
}

export default Card;
