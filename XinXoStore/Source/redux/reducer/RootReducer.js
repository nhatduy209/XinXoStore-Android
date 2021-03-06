import LoginReducer from '../reducer/LoginReducer';
import SignUpReducer from '../reducer/SignUpReducer';
import NewArrivalsReducer from '../reducer/NewArrivalsReducer'
import ShoppingCartReducer from '../reducer/ShoppingCartReducer';
import ReviewReducer from '../reducer/ReviewReducer';
import AddressReducer from '../reducer/AddressReducer';
import BillReducer from './BillReducer';
import PublisherInfoReducer from '../reducer/PublisherInfoReducer'
import ArrivalItemReducer from '../reducer/ArrivalItemReducer'
import ItemsUserReducer from '../reducer/ItemsUserReducer'
import PushNotificationReducer from './PushNotificationReducer';
import MessageReducer from './MessageReducer'
import {combineReducers} from 'redux';

const RootReducer = combineReducers({
  ArrivalItemReducer,
  LoginReducer,
  SignUpReducer,
  NewArrivalsReducer,
  ShoppingCartReducer,
  AddressReducer,
  BillReducer,
  ReviewReducer,
  PublisherInfoReducer,
  ItemsUserReducer,
  PushNotificationReducer,
  MessageReducer,
});

export default RootReducer;
