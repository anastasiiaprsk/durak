import { initialCardStack } from './const';
import { TGameSlice } from 'comp/reducers/reducer';
import { RootState } from 'comp/redux/redux';

//  Возвращает 24 карты без 6 карт которые я раздала
const filterCardStack = (stack, cardsUser) => {
  return stack.filter(
    (elem) => !cardsUser.some((userItem) => userItem.id === elem.id)
  );
};

//получить 36 карт и перемешать их
const getCardStack = (initialCardStack) => {
  let currentIndex = initialCardStack.length,
    temporaryValue,
    randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = initialCardStack[currentIndex];
    initialCardStack[currentIndex] = initialCardStack[randomIndex];
    initialCardStack[randomIndex] = temporaryValue;
  }

  return [...initialCardStack];
};

// Получает всю колоду, возвращает 6 карт которые положены игрокам
const getCardsByUser = (stack) => {
  const newState = [...stack];
  for (let i = newState.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newState[i], newState[j]] = [newState[j], newState[i]];
  }
  return newState.slice(0, 6);
};
// выбираем последний элемент из массива и возвращаем массив стек с измененным свойством trump у козырей
const chooseTrumpSuit = (state: TGameSlice): TGameSlice => {
  const lastItem = state.cardStack[state.cardStack.length - 1];

  const cards = state.cardStack.map((elem) => {
    if (elem.suit === lastItem.suit) {
      return {
        ...elem,
        trump: true,
      };
    }
    return {
      ...elem,
    };
  });

  const firstP = state.firstPlayer.map((elem) => {
    if (elem.suit === lastItem.suit) {
      return {
        ...elem,
        trump: true,
      };
    }
    return { ...elem };
  });

  const secondP = state.secondPlayer.map((elem) => {
    if (elem.suit === lastItem.suit) {
      return {
        ...elem,
        trump: true,
      };
    }
    return { ...elem };
  });

  return {
    // cardStack: cards,
    // firstPlayer: firstP,
    // secondPlayer: secondP,
    // table: table,
    // pairs: pairs,
    ...state,
    cardStack: cards,
    firstPlayer: firstP,
    secondPlayer: secondP,
  };
};

//  where is comments
const turnMove = (state: TGameSlice) => {
  const filteredArray1 = state.firstPlayer.filter((obj) => obj.trump === true);
  const filteredArray2 = state.secondPlayer.filter((obj) => obj.trump === true);

  const concatArrays = filteredArray1.concat(filteredArray2);

  const minCard = concatArrays.reduce((minCard, currentCard) => {
    return currentCard.name < minCard.name ? currentCard : minCard;
  }, concatArrays[0]);

  const resultArray = filteredArray1.find((obj) => obj.id === minCard.id)
    ? 0
    : 1;

  let turn;

  if (resultArray === 0) {
    turn = 'firstPlayer';
  } else {
    turn = 'secondPlayer';
  }

  return {
    ...state,
    turnOfTheMove: turn,
    buttons: { ...state.buttons, turnOfThePlayer: turn },
  }; // что же я сюда передаю то блять!!!!!!!!!
};

//че здесь происходит pizdets
// собираю все функции из утилс в одну чтобы осуществить первую раздачу карт - сформировать колоду 36 карт,
// затем раздеть 6 карт первому игроку, после чего очистить колоду, затем раздать карты уже второму пользователю,
// после чего снова очистить колоду карт.
export const firstDistribution = (state: TGameSlice) => {
  const cardsStack = getCardStack(initialCardStack);
  const firstPlayer = getCardsByUser(cardsStack);
  const filter = filterCardStack(cardsStack, firstPlayer);
  const secondPlayer = getCardsByUser(filter);
  const filter2 = filterCardStack(filter, secondPlayer);

  state = {
    ...state,
    cardStack: filter2,
    firstPlayer: firstPlayer,
    secondPlayer: secondPlayer,
  };

  const choseTrump = chooseTrumpSuit(state);
  // return chooseTrumpSuit(filter2, firstPlayer, secondPlayer, turnOfTheMove)
  return turnMove(choseTrump);
};

// ХОД: принимает state и карту игрока, на которую мы кликнули, чтобы походить.
// меняет table and pairs, в тэйбл находятся карты, которыми ходит игрок, а в пэирс их id
export const makeMoveChangeTablePairs = (state, clickedCard) => {
  const id = clickedCard.id;
  const table = [...state.table, clickedCard];
  const pairs = { ...state.pairs, [id]: null };

  return { table: table, pairs: pairs };
};

//
// //need comments
export const clearPlayers = (player, table) => {
  const tableIds = table.map((el) => el.id);

  return player.filter((el) => !tableIds.includes(el.id));
};

// функция, которая после клика на карту в GameBoard (она берется из тэйбл) проверяет, пустой ли ковер. если пустой, ничего не происходит
// если не пустой, мы смотрим айди карты тэйбл, затем ищем этот айди в пэирс, затем достаем объект из ковер и помещаем в пэирс по айди -
// пэирс по умолчанию нужно сделать нулл потому что нам нружно проверять наличие объекта, если пэрс != нул мы туда кладем объект
// чистим плееров от карт которыми бьемся
export const madePairsFromCover = (state: TGameSlice, clickedCard) => {
  if (!state.cover) {
    return { ...state };
  }
  const clickedCardId = clickedCard.id;

  const pairs = {
    ...state.pairs,
    [clickedCardId]: state.cover,
  };

  const firstPlayer = [...state.firstPlayer];
  const secondPlayer = [...state.secondPlayer];
  const cover = { ...state.cover };
  const filteredFirstPLayer = firstPlayer.filter(
    (elem) => cover.id !== elem.id
  );
  const filteredSecondPlayer = secondPlayer.filter(
    (elem) => cover.id !== elem.id
  );

  //comments. its trash
  if (state.pairs[clickedCardId] == null) {
    return {
      ...state,
      firstPlayer: filteredFirstPLayer,
      secondPlayer: filteredSecondPlayer,
      pairs: pairs,
      cover: null,
    };
  }
  if (
    state.pairs[clickedCardId] !== null &&
    state.turnOfTheMove == 'firstPlayer'
  ) {
    return {
      ...state,
      cover: null,
    };
  }
  if (
    state.pairs[clickedCardId] !== null &&
    state.turnOfTheMove == 'secondPlayer'
  ) {
    return {
      ...state,
      cover: null,
    };
  }
  return state;
};

// функция которую я привяжу к кнопке BitaButton. после нажатия на кнопку все карты на поле должны очищаться и
// помещаются...зачем им куда-то помещаться? они никак после этого не используются.
// pairs table очищаются. затем нужно раздать игрокам карты. нужно посчитать сколько кому карт раздать и в каком порядке
// после нажатия на кнопку меняется очередь хода - в turnOnTheMove
// разбить это на несколько функций
const clearGameTableAfterBita = (state: TGameSlice) => {
  return {
    ...state,
    table: [],
    pairs: null,
    cover: null,
  };
};

// нужно раздать игрокам карты. первому раздаем карты тому, чья была очередь ходить. проверяем сколько карт у игроков и если
// их меньше 6 берем первые(верхние) карты из кардстека - чистим кардстек - кладем в плеерс.
// эту функцию можно переиспользовать в take
const distributionCardsAfterBita = (state: TGameSlice) => {
  if (state.turnOfTheMove == 'firstPlayer' && state.firstPlayer.length < 6) {
    const len = 6 - state.firstPlayer.length;
    const cardsForDistribution = state.cardStack.slice(0, len);
    const firstPlayer = [...state.firstPlayer, ...cardsForDistribution];
    const filteredCardStack = state.cardStack.filter(
      (elem) => !firstPlayer.some((elem2) => elem2.id === elem.id)
    );
    // раздачу второму игроку добавить
    const lenSec = 6 - state.secondPlayer.length;
    const cardsForDistributionSecond = filteredCardStack.slice(0, lenSec); // исправляем
    const secondPlayer = [...state.secondPlayer, ...cardsForDistributionSecond];
    const resultFilteredCardStack = filteredCardStack.filter(
      (elem) => !secondPlayer.some((elem2) => elem2.id === elem.id)
    );
    return {
      ...state,
      turnOfTheMove: 'secondPlayer',
      cardStack: resultFilteredCardStack,
      firstPlayer: firstPlayer,
      secondPlayer: secondPlayer,
    };
  }
  if (state.turnOfTheMove == 'secondPlayer' && state.secondPlayer.length < 6) {
    const len = 6 - state.secondPlayer.length;
    const cardsForDistribution = state.cardStack.slice(0, len);
    const secondPlayer = [...state.secondPlayer, ...cardsForDistribution];
    const filteredCardStack = state.cardStack.filter(
      (elem) => !secondPlayer.some((elem2) => elem2.id === elem.id)
    );
    const lenSec = 6 - state.firstPlayer.length;
    const cardsForDistributionSecond = filteredCardStack.slice(0, lenSec);
    const firstPlayer = [...state.firstPlayer, ...cardsForDistributionSecond];
    const resultFilteredCardStack = filteredCardStack.filter(
      (elem) => !firstPlayer.some((elem2) => elem2.id === elem.id)
    );

    return {
      ...state,
      turnOfTheMove: 'firstPlayer',
      cardStack: resultFilteredCardStack,
      firstPlayer: firstPlayer,
      secondPlayer: secondPlayer,
      buttons: {
        ...state.buttons,
        turnOfThePlayer:
          state.buttons.turnOfThePlayer === 'firstPlayer'
            ? 'secondPlayer'
            : 'firstPlayer',
      },
    };
  }
};

export const changeTurnOfThePlayer = (turn) => {
  return turn === 'firstPlayer' ? 'secondPlayer' : 'firstPlayer';
};

export const bitaButtonFunction = (state) => {
  const clearedTable = clearGameTableAfterBita(state);
  return distributionCardsAfterBita(clearedTable);
};

// export const takeButtonFunction = (state) => {
//   if (state.turnOfTheMove == 'firstPlayer') {
//     return [...state.secondPlayer, ...state.table];
//   }
// };
