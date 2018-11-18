import logger from "redux-logger";
import reducer from "./reducers";
import firebaseMiddleware from "./firebase";
import { createStore, applyMiddleware } from "redux";

const { firebase, persistor } = firebaseMiddleware(["expenses", "entries"]);

export const store = createStore(persistor(reducer), applyMiddleware(firebase));
