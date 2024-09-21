const initialState = {
  cardStack: [],
  firstPlayer: [],
  secondPlayer: [],
  turnOfTheMove: "",
  table: {},
  pairs: {},
};

export const reducer = (state = initialState, action) => {
  if (action.type === "DISTRIBUTION") {
    return { ...action.state };
  }

  if (action.type === "TABLE") {
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
