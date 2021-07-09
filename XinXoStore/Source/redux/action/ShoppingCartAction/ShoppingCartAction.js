
import { NAME_ACTIONS } from './ActionName';

/*GET_ALL_PRODUCT*/
export function GetAllProduct(idAccount){
    return{
        type:NAME_ACTIONS.SHOPPING_CART_ACTIONS.GET_ALL_PRODUCT,
        data:{
            idAccount
        }
    }
}
 
/*GET NUMBER CART*/
export function GetNumberCart(){
    return{
        type: NAME_ACTIONS.SHOPPING_CART_ACTIONS.GET_NUMBER_CART
    }
}
 
export function AddCart(idAccount,payload){
    return {
        type: NAME_ACTIONS.SHOPPING_CART_ACTIONS.ADD_CART,
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
