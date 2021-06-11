import LoginEpic from './LoginEpics/LoginEpic';
import { combineEpics } from 'redux-observable';
export default combineEpics(
    LoginEpic
)