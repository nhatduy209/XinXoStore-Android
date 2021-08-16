import {NAME_ACTIONS} from './ActionName'
export function pushNotification( userBought , username ){
  console.log('userBought------' , userBought);
  return{
    type : NAME_ACTIONS.PUSH_NOTIFICATIONS_ACTION.PUSH_NOTIFICATIONS_ACTION,
    data : {userBought , username}
  }
}