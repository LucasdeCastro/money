import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

import expenses from "./expenses";
import month from "./month";
import salary from "./salary";
import { firebaseReducer } from "../firebase";

export default combineReducers({
  month,
  salary,
  expenses,
  form: formReducer,
  firebase: firebaseReducer
});
