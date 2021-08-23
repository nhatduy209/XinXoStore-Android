import {NAME_ACTIONS} from './ActionName'
export function getListNewArrivals(sortUp = false , limit =  5){
  return{
    type : NAME_ACTIONS.GET_NEW_ARRIVALS_ITEMS.GET_NEW_ARRIVALS_ITEMS_ACTION,
    data : {sortUp,limit }
  }
}