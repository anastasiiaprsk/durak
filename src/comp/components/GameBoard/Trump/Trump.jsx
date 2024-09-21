import classes from './trump.module.css'

export const Trump = (props) => {

    const spans = {
        11: <span className={classes.rank}>J</span>,
        12: <span className={classes.rank}>Q</span>,
        13: <span className={classes.rank}>K</span>,
        14: <span className={classes.rank}>A</span>,
        6: <span className={classes.rank}>6</span>,
        7: <span className={classes.rank}>7</span>,
        8: <span className={classes.rank}>8</span>,
        9: <span className={classes.rank}>9</span>,
        10: <span className={classes.rank}>10</span>
    }

    const suits = {
        'hearts': <span className={`${classes.suit} ${classes.heart}`}>♥️</span>,
        'diamonds': <span className={`${classes.suit} ${classes.diamond}`}>♦️</span>,
        'clubs': <span className={`${classes.suit} ${classes.club}`}>♣️</span>,
        'spades': <span className={`${classes.suit} ${classes.spade}`}>♠️</span>
    }


    return (
        <div className={classes.card}>
            <div className={`${classes.corner} ${classes.topLeft}`}>
                {spans[props?.trump?.name]}
                {suits[props?.trump?.suit]}
            </div>
            <div className={`${classes.corner} ${classes.bottomRight}`}>
                {spans[props?.trump?.name]}
                {suits[props?.trump?.suit]}
            </div>
        </div>
    )
}