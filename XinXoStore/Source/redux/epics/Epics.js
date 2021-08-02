import LoginEpic from './LoginEpics/LoginEpic';
import NewArrivalsEpic from './NewArrivalsEpics/NewArrivalsEpics';
import DetailArrivalEpic from './DetailEpics/DetailArrivalEpic';
import SignUpEpic from './SignUpEpics/SignUpEpic';
import { combineEpics } from 'redux-observable';
import AddressEpic from './AddressEpics/AddressEpic';
import ShoppingCartEpic from './ShoppingCartEpics/ShoppingCartEpic';
import ReviewsEpic from './ReviewEpics/ReviewEpics';
import PublisherInfoEpic from './PublserInfoEpics/PublsherInfoEpics';
import GetItemForUserEpic from './GetItemForUserEpics/GetItemForUserEpics';
import PushNotificationEpic from './PushNotificationEpics/PushNotificationEpics'

export default combineEpics(
    DetailArrivalEpic,
    LoginEpic,
    SignUpEpic,
    NewArrivalsEpic,
    ReviewsEpic,
    AddressEpic,
    ShoppingCartEpic,
    PublisherInfoEpic,
    GetItemForUserEpic,
    PushNotificationEpic,
)