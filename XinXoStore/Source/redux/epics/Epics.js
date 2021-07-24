import LoginEpic from './LoginEpics/LoginEpic';
import NewArrivalsEpic from './NewArrivalsEpics/NewArrivalsEpics';
import DetailArrivalEpic from './DetailEpics/DetailArrivalEpic';
import SignUpEpic from './SignUpEpics/SignUpEpic';
import { combineEpics } from 'redux-observable';
import AddressEpic from './AddressEpics/AddressEpic';
import ShoppingCartEpic from './ShoppingCartEpics/ShoppingCartEpic';
import BillEpic from './BillEpics/BillEpic';
export default combineEpics(
    DetailArrivalEpic,
    LoginEpic,
    SignUpEpic,
    NewArrivalsEpic,
    AddressEpic,
    ShoppingCartEpic,
    BillEpic
)