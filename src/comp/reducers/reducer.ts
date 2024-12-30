import {
  clearPlayers,
  firstDistribution,
  madePairsFromCover,
  makeMoveChangeTablePairs,
  bitaButtonFunction,
  changeTurnOfThePlayer,
} from 'comp/components/Utils/utils';

export interface TCard {
  suit: string;
  name: number;
  id: number;
  trump: boolean;
}

export interface TGameSlice {
  cardStack: Array<TCard>;
  firstPlayer: Array<TCard>;
  secondPlayer: Array<TCard>;
  turnOfTheMove: string;
  table: Array<TCard>;
  pairs: Record<number, TCard | null>;
  cover: TCard | null;
  buttons: any;
}

const initialState: TGameSlice = {
  cardStack: [],
  firstPlayer: [],
  secondPlayer: [],
  turnOfTheMove: '',
  table: [],
  pairs: null,
  cover: null,
  buttons: {
    turnOfThePlayer: '',
    bita: {
      player: '',
      active: '',
    },
    take: {},
    letHimTake: {},
  },
};

type TMakeMove = {
  type: 'MAKE-MOVE';
  payload: {
    card: TCard;
  };
};
type TCoverCard = {
  type: 'COVER-CARD';
  payload: {
    card: TCard;
  };
};
type TPairsForCover = {
  type: 'PAIRS-FOR-MOVE';
  payload: {
    card: TCard;
  };
};

type TypeForAction = TMakeMove | TCoverCard | TPairsForCover;

export const reducer = (state = initialState, action: TypeForAction) => {
  if (action.type === 'FIRST-DISTRIBUTION') {
    const updatedState = firstDistribution(state);

    return { ...updatedState };
  }

  if (action.type === 'MAKE-MOVE') {
    const { table, pairs } = makeMoveChangeTablePairs(
      state,
      action.payload.card
    );
    const turnOfTheMove = state.turnOfTheMove;
    return {
      ...state,
      table: table,
      pairs: pairs,
      cover: null,
      [turnOfTheMove]: clearPlayers(
        turnOfTheMove === 'firstPlayer'
          ? state.firstPlayer
          : state.secondPlayer,
        table
      ),
    };
  }

  if (action.type === 'COVER-CARD') {
    return { ...state, cover: action.payload.card };
  }
  if (action.type === 'PAIRS-FOR-MOVE') {
    const updatedState = madePairsFromCover(state, action.payload.card);
    return { ...updatedState };
  }
  if (action.type === 'BITA-BUTTON') {
    const updatedState = bitaButtonFunction(state);
    return { ...updatedState };
  }

  if (action.type === 'CHANGE-PLAYER-TURN') {
    const turn = changeTurnOfThePlayer(state.buttons.turnOfThePlayer);
    return { ...state, buttons: { ...state.buttons, turnOfThePlayer: turn } };
  }
  return state;
};

export const firstDistributionAct = () => {
  return { type: 'FIRST-DISTRIBUTION' };
};
export const makeMoveAction = (card: TCard) => {
  return { type: 'MAKE-MOVE', payload: { card } };
};
export const chooseCardForCoverAction = (card: TCard) => {
  return { type: 'COVER-CARD', payload: { card } };
};
export const madePairsAction = (card: TCard) => {
  return { type: 'PAIRS-FOR-MOVE', payload: { card } };
};
export const bitaButtonAction = () => {
  return { type: 'BITA-BUTTON' };
};
export const takeButtonAction = () => {
  return { type: 'TAKE-CARDS' };
};
export const changeTurnOfThePlayerAction = () => {
  return { type: 'CHANGE-PLAYER-TURN' };
};

//
