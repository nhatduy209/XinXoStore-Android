import LoginEpic from './LoginEpics/LoginEpic';
import SignUpEpic from './SignUpEpics/SignUpEpic';
import { combineEpics } from 'redux-observable';
export default combineEpics(
    LoginEpic,
    SignUpEpic
)