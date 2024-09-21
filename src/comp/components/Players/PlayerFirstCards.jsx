import { Card } from "../GameBoard/OneCard/Card";
import { useSelector } from "react-redux";
import classes from "./playerFirst.module.css";
import { tableAction } from "../../reducers/reducer";
import { useDispatch } from "react-redux";
import { tableFunc } from "../GameBoard/Utils/utils";

export const PlayerFirst = () => {
  const card = useSelector((state) => state.state.firstPlayer);
  const turn = useSelector((state) => state.state.turnOfTheMove);
  const state = useSelector((state) => state.state);

  const dispatch = useDispatch();

  const turnOfTheFirst = (event) => {
    const clickedCard = event.target;
    const table = tableFunc(state, clickedCard);
    dispatch(tableAction(table));
  };

  return (
    <div className={classes.first}>
      {card.map((elem) => (
        <Card
          card={elem}
          key={elem.id}
          onClick={turn === "firstPlayer" ? turnOfTheFirst : undefined}
        />
      ))}
    </div>
  );
};
