import LoginReducer from '../reducer/LoginReducer';
import SignUpReducer from '../reducer/SignUpReducer';
import {combineReducers} from 'redux';
const RootReducer = combineReducers({
  LoginReducer,
  SignUpReducer
});

export default RootReducer;
