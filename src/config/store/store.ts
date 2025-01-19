import { combineReducers, configureStore } from "@reduxjs/toolkit";
import Logger from "../middleware/Logger";
import ApiMiddleware from "../middleware/ApiMiddleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from "redux-persist";
import Form from "./form";
import Favorites from "./favorites";
import Movies from "./movies";
const dataSvcReducer = combineReducers({
  form: Form,
  movies: Movies,
  favorites: Favorites
});
const rootReducer = combineReducers({
  dataSvc: dataSvcReducer
});
const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["form", "favorites", "movies"]
};
const reducer = persistReducer(persistConfig, rootReducer);
const Store = configureStore({
  reducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
    }
  })
});
export const persistor = persistStore(Store);
export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;
export default Store;