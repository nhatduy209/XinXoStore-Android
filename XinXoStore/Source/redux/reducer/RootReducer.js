import LoginReducer from '../reducer/LoginReducer';
import SignUpReducer from '../reducer/SignUpReducer';
import NewArrivalsReducer from '../reducer/NewArrivalsReducer'
import {combineReducers} from 'redux';

const RootReducer = combineReducers({
  LoginReducer,
  SignUpReducer,
  NewArrivalsReducer
});

export default RootReducer;
