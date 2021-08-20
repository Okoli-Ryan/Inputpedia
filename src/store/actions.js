export const setLang = (payload) => {
  return {
    type: "SETLANG",
    payload: payload,
  };
};

export const setData = (payload) => {
  return {
    type: "SETDATA",
    payload: payload,
  };
};

export const setTopic = (payload) => {
  return {
    type: "SETTOPIC",
    payload: payload,
  };
};

export const setModal = (payload) => {
  return {
    actionType: "SET-MODAL",
    display: payload.display,
    type: payload.type,
  };
};

export const removeModal = (_) => {
  return {
    actionType: "REMOVE-MODAL",
    display: false,
    type: "delete",
  };
};

export const setLoading = (payload) => {
  return {
    type: "SET-LOADING",
    payload: payload,
  };
};
