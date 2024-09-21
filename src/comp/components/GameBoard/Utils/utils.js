import { initialCardStack } from "./const";

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
const chooseTrumpSuit = (
  cardStack,
  firstPlayer,
  secondPlayer,
  table,
  pairs
) => {
  const lastItem = cardStack[cardStack.length - 1];

  const cards = cardStack.map((elem) => {
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

  const firstP = firstPlayer.map((elem) => {
    if (elem.suit === lastItem.suit) {
      return {
        ...elem,
        trump: true,
      };
    }
    return { ...elem };
  });

  const secondP = secondPlayer.map((elem) => {
    if (elem.suit === lastItem.suit) {
      return {
        ...elem,
        trump: true,
      };
    }
    return { ...elem };
  });

  return {
    cardStack: cards,
    firstPlayer: firstP,
    secondPlayer: secondP,
    table: table,
    pairs: pairs,
  };
};

const turnMove = (state) => {
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
    turn = "firstPlayer";
  } else {
    turn = "secondPlayer";
  }

  return { ...state, turnOfTheMove: turn };
};

export const firstDistribution = () => {
  const cardsStack = getCardStack(initialCardStack);

  const firstPlayer = getCardsByUser(cardsStack);

  const filter = filterCardStack(cardsStack, firstPlayer);
  const secondPlayer = getCardsByUser(filter);
  const filter2 = filterCardStack(filter, secondPlayer);
  const table = {};
  const pairs = {};
  const choseTrump = chooseTrumpSuit(
    filter2,
    firstPlayer,
    secondPlayer,
    table,
    pairs
  );
  // return chooseTrumpSuit(filter2, firstPlayer, secondPlayer, turnOfTheMove)
  return turnMove(choseTrump);
};

export const tableFunc = (state, clickedCard) => {
  const id = clickedCard.id;
  const table = (state.table = { id: id });
  return { ...state, table: table };
};
