import { configureStore } from "@reduxjs/toolkit";
import RootReducer from "./Reducer";
import RootSaga from "./Saga";
import createSagaMiddleware from "redux-saga";

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

const store = configureStore({
  reducer: RootReducer,
  middleware: (getdefaultmiddle) => getdefaultmiddle().concat(middleware),
});

sagaMiddleware.run(RootSaga);

export default store;
