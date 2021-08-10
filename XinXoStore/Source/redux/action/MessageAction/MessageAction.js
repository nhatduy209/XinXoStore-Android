import {NAME_ACTIONS} from './ActionName'
export function getListMessage(username , usernameChatting){
  return{
    type : NAME_ACTIONS.MESSAGE_ACTION.GET_LIST_MESSAGE_ACTION,
    data : {username , usernameChatting},
  }
}

export function sendMessage(messageData){
  return{
    type : NAME_ACTIONS.MESSAGE_ACTION.SEND_MESSAGE_ACTION,
    data : {messageData}
  }
}

export function getBubbleMessage(usernameLogin ){
  return{
    type : NAME_ACTIONS.MESSAGE_ACTION.GET_BUBBLE_MESSAGE,
    data : {usernameLogin}
  }
}