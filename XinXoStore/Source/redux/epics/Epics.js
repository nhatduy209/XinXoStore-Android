import LoginEpic from './LoginEpics/LoginEpic';
import NewArrivalsEpic from './NewArrivalsEpics/NewArrivalsEpics';
import DetailArrivalEpic from './DetailEpics/DetailArrivalEpic';
import SignUpEpic from './SignUpEpics/SignUpEpic';
import { combineEpics } from 'redux-observable';

export default combineEpics(
    DetailArrivalEpic,
    LoginEpic,
    SignUpEpic,
    NewArrivalsEpic 
)