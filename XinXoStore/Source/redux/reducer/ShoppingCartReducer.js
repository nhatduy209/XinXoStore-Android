import { combineReducers } from "redux";
import { NAME_ACTIONS } from "../action/ShoppingCartAction/ActionName";

const initProduct = {
    numberCart:0,
    Carts:[],
    _products:[],
    totalBill:0
}
 
function ShoppingCartReducer(state = initProduct,action){
    switch(action.type){
        case NAME_ACTIONS.GET_ALL_PRODUCT:
            return{
                ...state,
                _products:action.payload
            }
        case NAME_ACTIONS.GET_NUMBER_CART:
                return{
                    ...state
                }
        case NAME_ACTIONS.ADD_CART:
            let checkExist=false;
            let cart = {    
                id:action.itemID,
            }
            state.Carts.forEach(element => {
                if(element.name===cart.name){
                   checkExist=true;
                }
            });
            if(checkExist===false){
                console.log("state.totalbill ",state.totalBill);
                console.log("state.totalbill ",state.totalBill+ cart.price);
                state.Carts.push(cart);
                return{
                    ...state,
                    numberCart:state.numberCart+1,
                    totalBill:state.totalBill+cart.price
                }
            }
            return{
                ...state,
                numberCart:state.numberCart,
                totalBill:state.totalBill
            }

            
            case NAME_ACTIONS.INCREASE_QUANTITY:
                state.numberCart++
                state.Carts[action.payload].quantity++;
               
               return{
                   ...state
               }
            case NAME_ACTIONS.DECREASE_QUANTITY:
                let quantity = state.Carts[action.payload].quantity;
                if(quantity>1){
                    state.numberCart--;
                    state.Carts[action.payload].quantity--;
                }
               
                return{
                    ...state
                }
            case NAME_ACTIONS.DELETE_CART:
                let quantity_ = 1;
                console.log("minux",state.totalBill-action.payload.price);
                return{
                    ...state,
                    numberCart:state.numberCart - quantity_,
                    Carts:state.Carts.filter(cartItem => cartItem.name !== action.payload.name),
                    totalBill:state.totalBill-action.payload.price
                }
        default:
            return state;
    }
}
export default ShoppingCartReducer;
