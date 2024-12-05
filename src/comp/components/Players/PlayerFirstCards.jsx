import { Card } from "../GameBoard/OneCard/Card";
import { useSelector } from "react-redux";
import classes from "./playerFirst.module.css";
import { tableAction } from "../../reducers/reducer.js";
import { useDispatch } from "react-redux";
import { tableFunc } from "../GameBoard/Utils/utils";
import {chooseCardForCoverAction} from "../../reducers/reducer.js";
import {chooseForCover} from "../GameBoard/Utils/utils";
// import {clearFirstPlayerStackAction} from "../../reducers/reducer";
// import {clearPlayers} from "../GameBoard/Utils/utils";

export const PlayerFirst = () => {
  const card = useSelector((state) => state.state.firstPlayer);
  const turn = useSelector((state) => state.state.turnOfTheMove);
  const state = useSelector((state) => state.state);
  const table = useSelector((state) => state.state.table);

  const dispatch = useDispatch();

  const turnOfTheFirst = (card) => {
    const table = tableFunc(state, card);
    dispatch(tableAction(table));
  };
  const chooseCardForCover = (card) => {
    const cover = chooseForCover(state, card)
    dispatch(chooseCardForCoverAction(cover))
  }

  return (
    <div className={classes.first}>
      {card.map((elem) => (
        <Card
          card={elem}
          key={elem.id}
          onClick={turn === "firstPlayer" ? () => turnOfTheFirst(elem) : (table.length > 0) ? () => chooseCardForCover(elem) : undefined}
        />
      ))}
    </div>
  );
};
