import LoginReducer from '../reducer/LoginReducer'
import NewArrivalsReducer from '../reducer/NewArrivalsReducer'
import ArrivalItemReducer from '../reducer/ArrivalItemReducer'
import {combineReducers} from 'redux';

const RootReducer = combineReducers({
  LoginReducer , NewArrivalsReducer , ArrivalItemReducer
});

export default RootReducer;
