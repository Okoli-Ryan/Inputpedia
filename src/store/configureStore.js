import { createStore, combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { reducer, dataReducer, topicReducer, modalReducer } from "./reducers";

const rootReducer = combineReducers({
  languageReducer: reducer,
  dataReducer,
  topicReducer,
  modalReducer,
});

const persistConfig = {
  key: "key2",
  storage: AsyncStorage,
  whitelist: ["languageReducer", "dataReducer", "topicReducer"], // which reducer want to store
};

const pReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(pReducer);

const persistor = persistStore(store);

export { store, persistor };
