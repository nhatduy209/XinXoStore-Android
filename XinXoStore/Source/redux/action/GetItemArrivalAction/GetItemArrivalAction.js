import {NAME_ACTIONS} from './ActionName'
export function getArrivalItem(Name){
  console.log(Name);
  return{
    type : NAME_ACTIONS.GET_ARRIVAL_ITEM.GET_ARRIVAL_ITEM_ACTION,
    data : {}
  }
}

export const editProduct = ( data ) => {
  console.log('THIS IS EDIT PRODUCT --------- ', data )
    return {
      type : NAME_ACTIONS.EDIT_PRODUCT.EDIT_PRODUCT_ACTIONS,
      data : {data } ,
    }
}