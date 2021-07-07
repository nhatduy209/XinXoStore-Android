import LoginReducer from '../reducer/LoginReducer'
import NewArrivalsReducer from '../reducer/NewArrivalsReducer'
import {combineReducers} from 'redux';

const RootReducer = combineReducers({
  LoginReducer , NewArrivalsReducer
});

export default RootReducer;
