import LoginEpic from './LoginEpics/LoginEpic';
import SignUpEpic from './SignUpEpics/SignUpEpic';
import { combineEpics } from 'redux-observable';
import NewArrivalsEpic from './NewArrivalsEpics/NewArrivalsEpics';

export default combineEpics(
    LoginEpic,
    SignUpEpic,
    NewArrivalsEpic 
)