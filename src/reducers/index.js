import { combineReducers } from "redux";
import expenses from "./expenses";
import salary from "./salary";

export default combineReducers({ expenses, salary });
