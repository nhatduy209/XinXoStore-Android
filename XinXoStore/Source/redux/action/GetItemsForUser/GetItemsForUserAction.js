import {NAME_ACTIONS} from './ActionName'
export function getItemForUsers( idOwner  ){
  return{
    type : NAME_ACTIONS.GET_ITEM_FOR_USER.GET_ITEM_FOR_USER_ACTIONS,
    data : {idOwner},
  }
}