import {NAME_ACTIONS} from './ActionName'
export function getListMessage(){
  return{
    type : NAME_ACTIONS.MESSAGE_ACTION.GET_LIST_MESSAGE_ACTION,
    data : {}
  }
}

export function sendMessage(messageData){
  return{
    type : NAME_ACTIONS.MESSAGE_ACTION.SEND_MESSAGE_ACTION,
    data : {messageData}
  }
}