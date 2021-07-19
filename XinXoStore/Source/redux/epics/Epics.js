import LoginEpic from './LoginEpics/LoginEpic';
import NewArrivalsEpic from './NewArrivalsEpics/NewArrivalsEpics';
import DetailArrivalEpic from './DetailEpics/DetailArrivalEpic';
import SignUpEpic from './SignUpEpics/SignUpEpic';
import { combineEpics } from 'redux-observable';
import AdressEpic from './AdressEpics/AdressEpic';
import ShoppingCartEpic from './ShoppingCartEpics/ShoppingCartEpic';
import ReviewsEpic from './ReviewEpics/ReviewEpics';

export default combineEpics(
    DetailArrivalEpic,
    LoginEpic,
    SignUpEpic,
    NewArrivalsEpic,
    AdressEpic,
    ShoppingCartEpic,
    ReviewsEpic,
)