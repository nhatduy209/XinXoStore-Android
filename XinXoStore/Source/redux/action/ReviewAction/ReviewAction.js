import {NAME_ACTIONS} from './ActionName'
export function getListReviews(ownerId){
  return{
    type : NAME_ACTIONS.GET_REVIEWS_ITEMS.GET_REVIEWS_ITEMS_ACTION,
    data : {ownerId,}
  }
}