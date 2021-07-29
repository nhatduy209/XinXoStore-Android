import {NAME_ACTIONS} from './ActionName'
export function pushNotification( userId , username ){
  console.log('userID' , userId);
  return{
    type : NAME_ACTIONS.PUSH_NOTIFICATIONS_ACTION.PUSH_NOTIFICATIONS_ACTION,
    data : {userId , username}
  }
}