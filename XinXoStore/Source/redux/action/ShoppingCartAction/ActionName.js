export const NAME_ACTIONS={
    INCREASE_QUANTITY : 'INCREASE_QUANTITY',
    DECREASE_QUANTITY : 'DECREASE_QUANTITY',
    GET_ALL_PRODUCT : 'GET_ALL_PRODUCT',
    GET_NUMBER_CART : 'GET_NUMBER_CART',
    ADD_CART : 'ADD_CART' ,
    UPDATE_CART : 'UPDATE_CART',
    DELETE_CART : 'DELETE_CART',
}

/*GET_ALL_PRODUCT*/
export function GetAllProduct(payload){
    return{
        type:'GET_ALL_PRODUCT',
        payload
    }
}
 
/*GET NUMBER CART*/
export function GetNumberCart(){
    return{
        type:'GET_NUMBER_CART'
    }
}
 
export function AddCart(payload){
    return {
        type:'ADD_CART',
        payload
    }
}
export function UpdateCart(payload){
    return {
        type:'UPDATE_CART',
        payload
    }
}
export function DeleteCart(payload){
    return{
        type:'DELETE_CART',
        payload
    }
}
 
export function IncreaseQuantity(payload){
    return{
        type:'INCREASE_QUANTITY',
        payload
    }
}
export function DecreaseQuantity(payload){
    return{
        type:'DECREASE_QUANTITY',
        payload
    }
}
