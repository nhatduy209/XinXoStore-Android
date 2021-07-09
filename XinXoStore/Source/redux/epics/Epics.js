import LoginEpic from './LoginEpics/LoginEpic';
import NewArrivalsEpic from './NewArrivalsEpics/NewArrivalsEpics';
import DetailArrivalEpic from './DetailEpics/DetailArrivalEpic';
import SignUpEpic from './SignUpEpics/SignUpEpic';
import { combineEpics } from 'redux-observable';
import NewArrivalsEpic from './NewArrivalsEpics/NewArrivalsEpics';
import AdressEpic from './AdressEpics/AdressEpic';
import ShoppingCartEpic from './ShoppingCartEpics/ShoppingCartEpic';

export default combineEpics(
    DetailArrivalEpic,
    LoginEpic,
    SignUpEpic,
    NewArrivalsEpic,
    AdressEpic,
    ShoppingCartEpic
)