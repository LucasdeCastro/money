import { combineReducers } from "redux";
import expenses from "./expenses";
import salary from "./salary";
import { firebaseReducer } from "../firebase";

export default combineReducers({ expenses, salary, firebase: firebaseReducer });
