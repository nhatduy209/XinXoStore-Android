import {NAME_ACTIONS} from './ActionName'
export function getArrivalItem(Name){
  console.log(Name);
  return{
    type : NAME_ACTIONS.GET_ARRIVAL_ITEM.GET_ARRIVAL_ITEM_ACTION,
    data : {}
  }
}