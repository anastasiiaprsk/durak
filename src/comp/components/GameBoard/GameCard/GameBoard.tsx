import { Card, GameBoardCard } from '../OneCard/Card';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from 'hooks/useTypedSelector';
import { madePairsAction } from 'comp/reducers/reducer';

export const GameBoard = () => {
  const array = useTypedSelector((state) => state.game.table);
  const coveredCard = useTypedSelector((state) => state.game.pairs);
  const dispatch = useDispatch();
  const clickOnCardForMove = (card) => {
    dispatch(madePairsAction(card));
  };

  return (
    <div style={{ display: 'flex' }}>
      {array.map((elem) => (
        <GameBoardCard
          card={elem}
          key={`table-${elem.id}`}
          onClick={() => clickOnCardForMove(elem)}
          coveredCard={coveredCard[elem.id]}
        />
      ))}
    </div>
  );
};
