import LoginEpic from './LoginEpics/LoginEpic';
import NewArrivalsEpic from './NewArrivalsEpics/NewArrivalsEpics';
import EditProfileEpic from './EditProfileEpics/EditProfileEpic';
import { combineEpics } from 'redux-observable';
export default combineEpics(
    LoginEpic , NewArrivalsEpic ,  EditProfileEpic
)