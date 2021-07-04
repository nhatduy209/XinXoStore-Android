
import { NAME_ACTIONS } from './ActionName';

/*GET_ALL_PRODUCT*/
export function GetAllProduct(payload){
    return{
        type:NAME_ACTIONS.GET_ALL_PRODUCT,
        payload
    }
}
 
/*GET NUMBER CART*/
export function GetNumberCart(){
    return{
        type: NAME_ACTIONS.GET_NUMBER_CART
    }
}
 
export function AddCart(payload){
    return {
        type: NAME_ACTIONS.ADD_CART,
        payload
    }
}
export function UpdateCart(payload){
    return {
        type:NAME_ACTIONS.UPDATE_CART,
        payload
    }
}
export function DeleteCart(payload){
    return{
        type:NAME_ACTIONS.DELETE_CART,
        payload
    }
}
 
export function IncreaseQuantity(payload){
    return{
        type:NAME_ACTIONS.INCREASE_QUANTITY,
        payload
    }
}
export function DecreaseQuantity(payload){
    return{
        type:NAME_ACTIONS.DECREASE_QUANTITY,
        payload
    }
}
