
import { NAME_ACTIONS } from './ActionName';

export function GetAllProduct(idAccount){
    return{
        type:NAME_ACTIONS.SHOPPING_CART_ACTIONS.GET_ALL_SCREEN,
        data:{
            idAccount:idAccount
        }
    }
}
 
export function AddCart(idAccount,payload){
    return {
        type: NAME_ACTIONS.SHOPPING_CART_ACTIONS.ADD_SCREEN,
        data: {
            idAccount: idAccount,
            itemID: payload,
          }
    }
}
export function UpdateCart(payload){
    return {
        type:NAME_ACTIONS.SHOPPING_CART_ACTIONS.UPDATE_CART,
        payload
    }
}
export function DeleteCart(payload){
    return{
        type:NAME_ACTIONS.SHOPPING_CART_ACTIONS.DELETE_CART,
        payload
    }
}
export function DeleteItem(idAccount,id){
    return {
        type: NAME_ACTIONS.SHOPPING_CART_ACTIONS.REMOVE_ITEM_SCREEN,
        data: {
            idAccount: idAccount,
            id: id,
          }
    }
}
export function ResetStatus(){
    return {
        type: NAME_ACTIONS.SHOPPING_CART_ACTIONS.RESET_STATUS,
        data: {}
    }
}