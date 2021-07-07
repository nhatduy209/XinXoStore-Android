import LoginEpic from './LoginEpics/LoginEpic';
import SignUpEpic from './SignUpEpics/SignUpEpic';
import { combineEpics } from 'redux-observable';
import NewArrivalsEpic from './NewArrivalsEpics/NewArrivalsEpics';
import AdressEpic from './AdressEpics/AdressEpic';

export default combineEpics(
    LoginEpic,
    SignUpEpic,
    NewArrivalsEpic,
    AdressEpic
)