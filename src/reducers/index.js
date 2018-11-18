import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

import expenses from "./expenses";
import month from "./month";
import entries from "./entries";
import { firebaseReducer } from "../firebase";

export default combineReducers({
  month,
  entries,
  expenses,
  form: formReducer,
  firebase: firebaseReducer
});
