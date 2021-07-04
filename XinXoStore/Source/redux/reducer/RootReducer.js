import LoginReducer from '../reducer/LoginReducer'
import NewArrivalsReducer from '../reducer/NewArrivalsReducer'
import EditProfileReducer from '../reducer/EditProfileReducer';
import {combineReducers} from 'redux';

const RootReducer = combineReducers({
  LoginReducer , NewArrivalsReducer , EditProfileReducer
});

export default RootReducer;
