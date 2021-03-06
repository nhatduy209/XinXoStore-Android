import { combineReducers } from "redux";
import { NAME_ACTIONS } from "../action/ShoppingCartAction/ActionName";
import { Status } from "../../Config/dataStatus";
import { NAME_EPICS } from "../epics/ShoppingCartEpics/ActionName";

const shoppingCartState = {
    items: {
      status: Status.FAIL,
      data: {},
    },
    totalBill:0,
    isAdded:false
  };
 
const ShoppingCartReducer=(state = shoppingCartState,action)=>{
    switch(action.type){
        case NAME_EPICS.SHOPPING_CART_EPICS.GET_ALL_EPICS_SUCCESS:
          let totalBill=0;
          action.data.forEach(element => {
            totalBill+=parseInt(element.data.prices);
          });
            state = {
                ...state,
                items: {
                  status: state.items.status,
                  data: action.data,
                },
                totalBill:totalBill
              }
            
            break;
        case NAME_EPICS.SHOPPING_CART_EPICS.ADD_EPICS_SUCCESS:
          state = {
                ...state,
                items: {
                  status: Status.SUCCESS,
                  data: state.items.data,
                },
                isAdded:true
              }
            break;
        case NAME_EPICS.SHOPPING_CART_EPICS.ADD_EPICS_FAIL:
          state = {
                ...state,
                items: {
                  status: Status.FAIL,
                  data: state.items.data,
                },
                isAdded:true
              }
            break;
        case NAME_EPICS.SHOPPING_CART_EPICS.REMOVE_ITEM_EPIC_SUCCESS:
            state = {
                ...state,
                items: {
                  status: Status.SUCCESS,
                  data: action.data,
                }
              }
            break;
        case NAME_ACTIONS.SHOPPING_CART_ACTIONS.RESET_STATUS:
            state = {
                ...state,
                items: {
                  status: Status.FAIL,
                  data: action.data,
                },
                isAdded:false
              }
            break;
        
        default:
            break;
       
    }
    return state;
};
export default ShoppingCartReducer;
