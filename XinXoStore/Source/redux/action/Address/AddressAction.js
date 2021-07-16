import {NAME_ACTIONS} from './ActionName'
export function changeStatusAdd(){
  return{
    type:NAME_ACTIONS.ADD_ADDRESS_SCREEN.CHANGE_STATUS_TO_FAIL_SCREEN,
    data:{}
  }
}
export function getAddress(){
  return{
    type : NAME_ACTIONS.ADDRESS_ACTIONS.GET_ACTION_SCREEN,
    data : {}
  }
}

export function getListAddress(idAccount){
    return{
      type : NAME_ACTIONS.ADDRESS_ACTIONS.GET_ACTION_SCREEN,
      data : {
        idAccount:idAccount
      }
    }
}

export function addAddress(idAccount,data){
    return{
      type : NAME_ACTIONS.ADDRESS_ACTIONS.ADD_ACTION_SCREEN,
      data : {
        idAccount:idAccount,
        data: data
      }
    }
}
export function setDefault(){
    return{
      type : NAME_ACTIONS.ADDRESS_ACTIONS.SET_DEFAULT,
      data : {}
    }
}
export function removeAddress(){
    return{
      type : NAME_ACTIONS.ADDRESS_ACTIONS.REMOVE_ADDRESS,
      data : {}
    }
}
export function updateAddress(){
    return{
      type : NAME_ACTIONS.ADDRESS_ACTIONS.UPDATE_ADDRESS,
      data : {}
    }
}
export function getDefaultAddress(idAccount){
  return{
    type: NAME_ACTIONS.CHECKOUT_SCREEN.GET_DEFAULT_SCREEN,
    data:{idAccount}
  }
}