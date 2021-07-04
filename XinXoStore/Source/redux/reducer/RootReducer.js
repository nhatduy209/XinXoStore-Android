import LoginReducer from '../reducer/LoginReducer';
import SignUpReducer from '../reducer/SignUpReducer';
import NewArrivalsReducer from '../reducer/NewArrivalsReducer'
import ShoppingCartReducer from '../reducer/ShoppingCartReducer';

import {combineReducers} from 'redux';

const RootReducer = combineReducers({
  LoginReducer,
  SignUpReducer,
  NewArrivalsReducer,
  ShoppingCartReducer
});

export default RootReducer;
