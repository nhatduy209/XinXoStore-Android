import { NAME_ACTIONS } from "./ActionName"
export function getAll(idAccount){
    console.log('Bill ACTION----------' , idAccount);
    return{
        type:NAME_ACTIONS.BILL_SCREEN.GET_ALL_SCREEN,
        data:{idAccount}
    }
}