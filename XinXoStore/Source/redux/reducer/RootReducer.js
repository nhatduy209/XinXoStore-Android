import LoginReducer from '../reducer/LoginReducer';
import SignUpReducer from '../reducer/SignUpReducer';
import NewArrivalsReducer from '../reducer/NewArrivalsReducer'
import ShoppingCartReducer from '../reducer/ShoppingCartReducer';
import AddressReducer from '../reducer/AddressReducer';

import ArrivalItemReducer from '../reducer/ArrivalItemReducer'
import {combineReducers} from 'redux';

const RootReducer = combineReducers({
  ArrivalItemReducer,
  LoginReducer,
  SignUpReducer,
  NewArrivalsReducer,
  ShoppingCartReducer,
  AddressReducer
});

export default RootReducer;
