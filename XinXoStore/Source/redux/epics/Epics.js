import LoginEpic from './LoginEpics/LoginEpic';
import NewArrivalsEpic from './NewArrivalsEpics/NewArrivalsEpics';
import { combineEpics } from 'redux-observable';
export default combineEpics(
    LoginEpic , NewArrivalsEpic
)