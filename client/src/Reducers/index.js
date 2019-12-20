import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import workForceReducer from "./workForceReducer";
import attendanceReducer from "./attendanceReducer";
import displayStatReducer from "./displayStatReducer";
import stockReducer from "./stockReducer";
import ghostWorkerReducer from "./ghostWorkerReducer"

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
workForce :workForceReducer,
attendance:attendanceReducer,
stats:displayStatReducer,
item:stockReducer,
ghost:ghostWorkerReducer

});