import LoginEpic from './LoginEpics/LoginEpic';
import NewArrivalsEpic from './NewArrivalsEpics/NewArrivalsEpics';
import DetailArrivalEpic from './DetailEpics/DetailArrivalEpic';
import SignUpEpic from './SignUpEpics/SignUpEpic';
import { combineEpics } from 'redux-observable';
import AddressEpic from './AddressEpics/AddressEpic';
import ShoppingCartEpic from './ShoppingCartEpics/ShoppingCartEpic';
import PublisherInfoEpic from './PublserInfoEpics/PublsherInfoEpics';

export default combineEpics(
    DetailArrivalEpic,
    LoginEpic,
    SignUpEpic,
    NewArrivalsEpic,
    AddressEpic,
    ShoppingCartEpic,
    PublisherInfoEpic,
)