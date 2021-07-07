import LoginReducer from '../reducer/LoginReducer';
import SignUpReducer from '../reducer/SignUpReducer';
import NewArrivalsReducer from '../reducer/NewArrivalsReducer'
import ArrivalItemReducer from '../reducer/ArrivalItemReducer'
import {combineReducers} from 'redux';

const RootReducer = combineReducers({
  ArrivalItemReducer,
  LoginReducer,
  SignUpReducer,
  NewArrivalsReducer
});

export default RootReducer;
