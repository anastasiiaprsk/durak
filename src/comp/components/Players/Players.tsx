import classes from './playerFirst.module.css';
import { Card } from '../GameBoard/OneCard/Card';
import { useDispatch } from 'react-redux';
import {
  chooseCardForCoverAction,
  makeMoveAction,
} from '../../reducers/reducer';
import { useTypedSelector } from 'hooks/useTypedSelector';
import { BitaButton } from 'comp/components/Buttons/BitaButton';
import { TakeButton } from 'comp/components/Buttons/TakeButton';
import { ChangeTurnOfThePlayerButton } from 'comp/components/Buttons/ChangeTurnOfThePlayerButton';
import classStack from '../GameBoard/AllCardsStack/stack.module.css';

interface TPlayers {
  player: string;
}

export const Players = (props: TPlayers) => {
  const card1 = useTypedSelector((state) => state.game.firstPlayer);
  const card2 = useTypedSelector((state) => state.game.secondPlayer);
  const oneCommonCard = props.player === 'firstPlayer' ? card1 : card2;
  const turn = useTypedSelector((state) => state.game.turnOfTheMove);
  const turnForPlayer = useTypedSelector(
    (state) => state.game.buttons.turnOfThePlayer
  );
  const dispatch = useDispatch();
  const table = useTypedSelector((state) => state.game.table);

  const turnOfTheFirst = (card) => {
    dispatch(makeMoveAction(card));
  };
  const chooseCardForCover = (card) => {
    dispatch(chooseCardForCoverAction(card));
  };

  return (
    <div className={classes.display}>
      {props.player === turnForPlayer ? (
        <div className={classes.second}>
          {oneCommonCard.map((elem) => (
            <Card
              card={elem}
              key={`${elem.id}`}
              onClick={
                props.player === turn
                  ? () => turnOfTheFirst(elem)
                  : table.length > 0
                    ? () => chooseCardForCover(elem)
                    : undefined
              }
            />
          ))}
        </div>
      ) : (
        oneCommonCard.map((elem) => (
          <img
            key={`${elem.id}`}
            className={classStack.backcard}
            src={'https://dama-pik.com.ua/upload/iblock/e7b/114.jpg'}
          />
        ))
      )}

      {turn === props.player && props.player === turnForPlayer ? (
        <div>
          <BitaButton />
        </div>
      ) : undefined}
      {turn !== props.player && props.player === turnForPlayer ? (
        <div>
          <TakeButton />
        </div>
      ) : undefined}
      {turnForPlayer === props.player && table.length > 0 ? (
        <div>
          <ChangeTurnOfThePlayerButton />
        </div>
      ) : undefined}
    </div>
  );
};
