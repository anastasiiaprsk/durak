import { useSelector } from "react-redux";
import classes from "./playerFirst.module.css";
import { Card } from "../GameBoard/OneCard/Card";
import { useDispatch } from "react-redux";
import { tableFunc } from "../GameBoard/Utils/utils";
import { tableAction } from "../../reducers/reducer";

export const PlayerSecond = () => {
  const card = useSelector((state) => state.state.secondPlayer);
  const turn = useSelector((state) => state.state.turnOfTheMove);
  const state = useSelector((state) => state.state);
  const dispatch = useDispatch();

  const turnOfTheFirst = (event) => {
    const clickedCard = event.target;
    const table = tableFunc(state, clickedCard);
    dispatch(tableAction(table));
  };

  return (
    <div className={classes.second}>
      {card.map((elem) => (
        <Card
          card={elem}
          key={elem.id}
          onClick={turn === "secondPlayer" ? turnOfTheFirst : undefined}
        />
      ))}
    </div>
  );
};
