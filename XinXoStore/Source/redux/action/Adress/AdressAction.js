import {NAME_ACTIONS} from './ActionName'
export function getAdress(){
  return{
    type : NAME_ACTIONS.ADRESS_ACTIONS.GET_ADRESS,
    data : {}
  }
}

export function getListAdress(idAccount){
    return{
      type : NAME_ACTIONS.ADRESS_ACTIONS.GET_LIST_ADRESS,
      data : {
        idAccount:idAccount
      }
    }
}

export function addAdress(){
    return{
      type : NAME_ACTIONS.ADRESS_ACTIONS.ADD_ADRESS,
      data : {}
    }
}
export function setDefault(){
    return{
      type : NAME_ACTIONS.ADRESS_ACTIONS.SET_DEFAULT,
      data : {}
    }
}
export function removeAdress(){
    return{
      type : NAME_ACTIONS.ADRESS_ACTIONS.REMOVE_ADRESS,
      data : {}
    }
}
export function updateAdress(){
    return{
      type : NAME_ACTIONS.ADRESS_ACTIONS.UPDATE_ADRESS,
      data : {}
    }
}