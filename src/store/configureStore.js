import { createStore, combineReducers } from "redux";
import {
  reducer,
  dataReducer,
  topicReducer,
  modalReducer,
  loadingReducer,
} from "./reducers";

const store = createStore(
  combineReducers({
    languageReducer: reducer,
    dataReducer,
    topicReducer,
    modalReducer,
    loadingReducer,
  })
);

export default store;
