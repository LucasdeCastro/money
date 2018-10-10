import { createStore, applyMiddleware } from "redux";
import reducer from "./reducers";
import firebaseMiddleware from "./firebase";

const { firebase, persistor } = firebaseMiddleware(["expenses", "salary"]);

export const store = createStore(persistor(reducer), applyMiddleware(firebase));
