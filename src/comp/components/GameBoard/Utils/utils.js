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
  // cardStack,
  // firstPlayer,
  // secondPlayer,
  // table,
  // pairs,
    state
) => {

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
    ...state, cardStack: cards, firstPlayer: firstP, secondPlayer: secondP
  };
};


//  where is comments
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


//че здесь происходит pizdets
// собираю все функции из утилс в одну чтобы осуществить первую раздачу карт - сформировать колоду 36 карт,
// затем раздеть 6 карт первому игроку, после чего очистить колоду, затем раздать карты уже второму пользователю,
// после чего снова очистить колоду карт.
// функция должна быть чистой!!!!!!!! чтобы вернуть стейт, нужно сначала его принять - пустым! исправить
export const firstDistribution = (state) => {
  const cardsStack = getCardStack(initialCardStack);

  const firstPlayer = getCardsByUser(cardsStack);

  const filter = filterCardStack(cardsStack, firstPlayer);
  const secondPlayer = getCardsByUser(filter);
  const filter2 = filterCardStack(filter, secondPlayer);
  const table = [];
  const pairs = {};

  state = { ...state, cardStack: filter2, firstPlayer: firstPlayer, secondPlayer: secondPlayer };

  const choseTrump = chooseTrumpSuit(
    state
  );
  // return chooseTrumpSuit(filter2, firstPlayer, secondPlayer, turnOfTheMove)
  return turnMove(choseTrump);
};

export const tableFunc = (state, clickedCard) => {
  const id = clickedCard.id;
  const table =  [...state.table, clickedCard ]
  const pairs = {...state.pairs, [id]: {}}


  return { ...state, table: table, pairs: pairs, }
};


// what is this
//создаем массив в котором карты на которые мы кликнули для хода. затем используем это  массив в
// в компоненте gameBoard чтобы размапить (положить карты которыми ходим на игровую доску)

// !!!!!!!! нужно сделать очистку прямо здесь. мы принимаем стейт, значит его и должны возвращать! не массив рандомный
export const gameBoardFunc = (state) => {
  const array = []
  for(let i = 0; i < state.table.length; i++){
    for(let j = 0; j < state.firstPlayer.length; j++){
      if(state.table[i] === state.firstPlayer[j].id){
        array.push(state.firstPlayer[j])
      }
    }
  }
  for(let i = 0; i < state.table.length; i++){
    for(let j = 0; j < state.secondPlayer.length; j++){
      if(state.table[i] === state.secondPlayer[j].id){
        array.push(state.secondPlayer[j])
      }
    }
  }

  return {...state, cardsGameBoard: array}
}

//
// //need comments
export const clearPlayers = (player, table) => {
  const tableIds = table.map(el => el.id)

  return player.filter(el => !tableIds.includes(el.id))
}

// функция которрую я буду вызывать при клике на карту игрока (если сейчас не его очередь ходить) чтобы
// записать в ковер карту которой я хочу побить
export const chooseForCover = (state, clickedCard) => {
  const cover =  [...state.cover, clickedCard ]
  return { ...state, cover: cover }
}

// comment
export const makeACover = (state, cover) => {

  

}
