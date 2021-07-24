import { Status } from "../../Config/dataStatus";
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
                    status: Status.SUCCESS,
                    data: action.data
                }
            }
        }
        default:
            break;
    }
    return state;
}
export default BillReducer;