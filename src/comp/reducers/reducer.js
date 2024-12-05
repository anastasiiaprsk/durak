import { clearPlayers } from "../components/GameBoard/Utils/utils";

const initialState = {
  cardStack: [],
  firstPlayer: [],
  secondPlayer: [],
  turnOfTheMove: "",
  table: [],
  pairs: {},
  cover: []
};

export const reducer = (state = initialState, action) => {
  if (action.type === "DISTRIBUTION") {
    return { ...action.state };
  }

  if (action.type === "TABLE") {
    const turnOfTheMove = state.turnOfTheMove;

    return {
      ...action.state,
      table: action.state.table,
      // cardsGameBoard: gameBoardFunc({...state, table: action.state.table}).cardsGameBoard,
      [turnOfTheMove]: clearPlayers(
          turnOfTheMove === 'firstPlayer' ? action.state.firstPlayer : action.state.secondPlayer,
          action.state.table
      )
    }
  }

  if(action.type === 'COVER-CARD'){
    return { ...action.state };
  }

  return state;
};

export const firstDistributionAct = (state) => {
  return { type: "DISTRIBUTION", state };
};

export const tableAction = (state) => {
  return { type: "TABLE", state };
};

export const gameAction = () => {
  return {type: 'GAME-BOARD'}
}

export const chooseCardForCoverAction = (state) => {
  return {type: 'COVER-CARD', state}
}

// export const clearFirstPlayerStackAction = (state) => {
//   return {type: 'CLEAR-PLAYERS', state};
// }
//
// export const clearSecondPlayerAction = (state) => {
//   return {type: 'CLEAR-SECOND', state};
// }