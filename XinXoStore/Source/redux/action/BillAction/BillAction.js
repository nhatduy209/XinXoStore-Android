import { NAME_ACTIONS } from "./ActionName"
export function getAll(idAccount){
    return{
        type:NAME_ACTIONS.BILL_SCREEN.GET_ALL_SCREEN,
        data:{idAccount}
    }
}
export function checkOut(listItem, user,address){
    return {
        type: NAME_ACTIONS.CHECKOUT_SCREEN.CHECKOUT_SCREEN,
        data:{
            listItem, user,address
        }
    }
}
export function ResetStatus(){
    return {
        type: NAME_ACTIONS.CHECKOUT_SCREEN.RESET_STATUS,
        data:{
            
        }
    }
}