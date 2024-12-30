import { CardStack } from '../AllCardsStack/CardStack';
import { Trump } from '../Trump/Trump';
import classes from './durak.module.css';
import { GameBoard } from '../GameCard/GameBoard';
import { useTypedSelector } from 'hooks/useTypedSelector';
import { Players } from 'comp/components/Players/Players';

export const Durak = () => {
  const trump = useTypedSelector(
    (state) => state.game.cardStack[state.game.cardStack.length - 1]
  );

  return (
    <div>
      <Players player={'firstPlayer'} />

      <div className={classes.cardStack}>
        <CardStack />
        <Trump trump={trump} />
      </div>
      <div>
        <GameBoard />
      </div>

      <Players player={'secondPlayer'} />
    </div>
  );
};
