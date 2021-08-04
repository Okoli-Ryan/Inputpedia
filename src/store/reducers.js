const initialState = null;

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SETLANG":
      return action.payload;
    default:
      return state;
  }
};
