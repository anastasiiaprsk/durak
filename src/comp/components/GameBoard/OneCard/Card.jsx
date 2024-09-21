import classes from "./card.module.css";

export const Card = (props) => {
  const map = {
    11: <span className={classes.rank}>J</span>,
    12: <span className={classes.rank}>Q</span>,
    13: <span className={classes.rank}>K</span>,
    14: <span className={classes.rank}>A</span>,
    6: <span className={classes.rank}>6</span>,
    7: <span className={classes.rank}>7</span>,
    8: <span className={classes.rank}>8</span>,
    9: <span className={classes.rank}>9</span>,
    10: <span className={classes.rank}>10</span>,
  };

  const suit = {
    hearts: <span className={`${classes.suit} ${classes.heart}`}>♥️</span>,
    diamonds: <span className={`${classes.suit} ${classes.diamond}`}>♦️</span>,
    clubs: <span className={`${classes.suit} ${classes.club}`}>♣️</span>,
    spades: <span className={`${classes.suit} ${classes.spade}`}>♠️</span>,
  };

  return (
    <div onClick={props.onClick}>
      <div className={classes.card}>
        <div className={`${classes.corner} ${classes.topLeft}`}>
          {map[props.card.name]}
          {suit[props.card.suit]}
        </div>
        <div className={`${classes.corner} ${classes.bottomRight}`}>
          {map[props.card.name]}
          {suit[props.card.suit]}
        </div>
      </div>
    </div>
  );
};
