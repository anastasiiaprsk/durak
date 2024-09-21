import {CardStack} from "../AllCardsStack/CardStack";
import {PlayerFirst} from "../../Players/PlayerFirstCards";
import {Trump} from "../Trump/Trump";
import {useSelector} from "react-redux";
import classes from './durak.module.css'
import {PlayerSecond} from "../../Players/PlayerSecondCards";


export const Durak = () => {
    const trump = useSelector(state => state.state.cardStack[state.state.cardStack.length - 1])

    return <div>
        <PlayerSecond/>

        <div className={classes.cardStack}>
            <CardStack/>
            <Trump trump = {trump}/>
        </div>

        <PlayerFirst/>
    </div>
}