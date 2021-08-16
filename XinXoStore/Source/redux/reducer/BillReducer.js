import { Status } from "../../Config/dataStatus";
import { NAME_ACTIONS } from "../action/BillAction/ActionName";
import { NAME_EPICS } from "../epics/BillEpics/ActionName";

const billState={
    items:{
        status:Status.FAIL,
        data:{}
    }
}

const BillReducer=(state=billState,action)=>{
    switch(action.type){
        case NAME_EPICS.BILL_SCREEN.GET_ALL_SUCCESS:{
            return {
                ...state,
                items: {
                    status: state.items.status,
                    data: action.data
                }
            }
        }
        case NAME_EPICS.CHECKOUT_SCREEN.CHECKOUT_SUCCESS:{
            return {
                ...state,
                items: {
                    status: Status.SUCCESS,
                    data: action.data
                }
            }
        }
        case NAME_ACTIONS.CHECKOUT_SCREEN.RESET_STATUS:{
            return {
                ...state,
                items: {
                    status: Status.FAIL,
                    data: state.items.data
                }
            }
        }
        default:
            break;
    }
    return state;
}
export default BillReducer;