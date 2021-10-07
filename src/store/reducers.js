const initialState = null;

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SETLANG":
      return action.payload;
    default:
      return state;
  }
};

export const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SETDATA":
      return action.payload;
    default:
      return state;
  }
};

export const topicReducer = (state = { name: "Select Category" }, action) => {
  switch (action.type) {
    case "SETTOPIC":
      return action.payload;
    default:
      return state;
  }
};

export const modalReducer = (
  state = { display: false, type: "delete" },
  action
) => {
  switch (action.actionType) {
    case "SET-MODAL":
      return { display: true, type: action.type };
    case "REMOVE-MODAL":
      return { ...state, display: false };
    default:
      return state;
  }
};

