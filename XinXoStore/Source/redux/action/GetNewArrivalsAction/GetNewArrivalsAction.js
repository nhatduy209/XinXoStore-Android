import {NAME_ACTIONS} from './ActionName'
export function getListNewArrivals(sortUp = false ){
  return{
    type : NAME_ACTIONS.GET_NEW_ARRIVALS_ITEMS.GET_NEW_ARRIVALS_ITEMS_ACTION,
    data : {sortUp}
  }
}