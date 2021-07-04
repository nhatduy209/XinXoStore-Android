import LoginEpic from './LoginEpics/LoginEpic';
import NewArrivalsEpic from './NewArrivalsEpics/NewArrivalsEpics';
import DetailArrivalEpic from './DetailEpics/DetailArrivalEpic';
import { combineEpics } from 'redux-observable';
export default combineEpics(
    LoginEpic , NewArrivalsEpic, DetailArrivalEpic
)