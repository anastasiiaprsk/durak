import { useSelector } from "react-redux";
import classes from "./playerFirst.module.css";
import { Card } from "../GameBoard/OneCard/Card";
import { useDispatch } from "react-redux";
import {chooseForCover, tableFunc} from "../GameBoard/Utils/utils";
import {chooseCardForCoverAction, tableAction} from "../../reducers/reducer.js";


export const PlayerSecond = () => {
  const card = useSelector((state) => state.state.secondPlayer);
  const turn = useSelector((state) => state.state.turnOfTheMove);
  const state = useSelector((state) => state.state);
  const dispatch = useDispatch();
  const table = useSelector((state) => state.state.table);

  const turnOfTheFirst = (card) => {
    const table = tableFunc(state, card);
    dispatch(tableAction(table));
  };
  const chooseCardForCover = (card) => {
    const cover = chooseForCover(state, card)
    dispatch(chooseCardForCoverAction(cover))
  }


  return (
    <div className={classes.second}>
      {card.map((elem) => (
        <Card
          card={elem}
          key={elem.id}
          onClick={turn === "secondPlayer" ? () => turnOfTheFirst(elem) : (table.length > 0) ? () => chooseCardForCover(elem) : undefined}
        />
      ))}
    </div>
  );
};
