import LoginReducer from '../reducer/LoginReducer';
import SignUpReducer from '../reducer/SignUpReducer';
import NewArrivalsReducer from '../reducer/NewArrivalsReducer'
import ShoppingCartReducer from '../reducer/ShoppingCartReducer';
import AdressReducer from '../reducer/AdressReducer';
import ReviewReducer from '../reducer/ReviewReducer';
import ArrivalItemReducer from '../reducer/ArrivalItemReducer'
import {combineReducers} from 'redux';

const RootReducer = combineReducers({
  ArrivalItemReducer,
  LoginReducer,
  SignUpReducer,
  NewArrivalsReducer,
  ShoppingCartReducer,
  AdressReducer,
  ReviewReducer,
});

export default RootReducer;
