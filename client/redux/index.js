//This will be set up for combine reducers but will hold a single reducer to start
import { combineReducers } from "redux";
import reducer from './reducer';
import userAuthReducer from "./userAuthReducer";

const appReducer = combineReducers({
  reducer: reducer,
  userAuthReducer: userAuthReducer
});

export default appReducer;
