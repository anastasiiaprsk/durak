import {useDispatch} from "react-redux";
import {gameAction} from "../../../reducers/reducer.js";

import {useSelector} from "react-redux";
import {Card} from "../OneCard/Card";
import {gameBoardFunc} from "../Utils/utils";
import {useEffect} from "react";


export const GameBoard = (props) => {

    // const firstPlayer = useSelector(state => state.state.firstPlayer)
    // const secondPlayer = useSelector(state => state.state.secondPlayer)
    // const table = useSelector(state => state.state.table)
    const state = useSelector(state => state.state);
    const table = useSelector(state => state.state.table)
    const dispatch = useDispatch();

    const array = useSelector(state => state.state.table)

    return (
        <div style={{display: 'flex'}}>
            {array.map((elem) => (
                <Card
                    card={elem}
                    key={`table-${elem.id}`}
                    onClick={undefined}
                />
            ))}
        </div>
    )
}