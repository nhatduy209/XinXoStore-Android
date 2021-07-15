import { combineReducers } from "redux";
import { NAME_ACTIONS } from "../action/ShoppingCartAction/ActionName";
import { Status } from "../../Config/dataStatus";
import { NAME_EPICS } from "../epics/ShoppingCartEpics/ActionName";

const shoppingCartState = {
    items: {
      status: Status.FAIL,
      data: {},
    },
    totalBill:0
  };
 
const ShoppingCartReducer=(state = shoppingCartState,action)=>{
    switch(action.type){
        case NAME_EPICS.SHOPPING_CART_EPICS.GET_ALL_EPICS_SUCCESS:
            state = {
                ...state,
                items: {
                  status: Status.SUCCESS,
                  data: action.data,
                }
              }
            break;
        case NAME_EPICS.SHOPPING_CART_EPICS.ADD_EPICS_SUCCESS:
            state = {
                ...state,
                items: {
                  status: Status.SUCCESS,
                  data: action.data,
                }
              }
            break;
        // case NAME_ACTIONS.SHOPPING_CART_ACTIONS.DELETE_CART:
        //     let quantity_ = 1;
        //     console.log("minux",state.totalBill-action.payload.price);
        //     return{
        //         ...state,
        //         numberCart:state.numberCart - quantity_,
        //         Carts:state.Carts.filter(cartItem => cartItem.name !== action.payload.name),
        //         totalBill:state.totalBill-action.payload.price
        //     }
        default:
            break;
       
    }
    return state;
};
export default ShoppingCartReducer;
