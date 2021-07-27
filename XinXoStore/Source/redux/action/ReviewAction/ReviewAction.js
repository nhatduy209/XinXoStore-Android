import {NAME_ACTIONS} from './ActionName'
export function getListReviews(ownerId){
  return{
    type : NAME_ACTIONS.GET_REVIEWS_ITEMS.GET_REVIEWS_ITEMS_ACTION,
    data : {ownerId,}
  }
}

export function addReviews(data){
  return{
    type : NAME_ACTIONS.ADD_REVIEWS_ITEM.ADD_REVIEWS_ITEM_ACTION,
    data : {...data},
  }
}