import {NAME_ACTIONS} from './ActionName'
export function getArrivalItem(Name){
  return{
    type : NAME_ACTIONS.GET_ARRIVAL_ITEM.GET_ARRIVAL_ITEM_ACTION,
    data : {}
  }
}

export const editProduct = ( data ) => {
    return {
      type : NAME_ACTIONS.EDIT_PRODUCT.EDIT_PRODUCT_ACTIONS,
      data : {data } ,
    }
}

export const deleteProduct = ( imageNamePath,key ) => {
  console.log(imageNamePath,key);
    return {
      type : NAME_ACTIONS.DELETE_PRODUCT.DELETE_PRODUCT_ACTIONS,
      data : {
        imageNamePath: imageNamePath,
        key: key,
      } ,
    }
}

export const addProduct = (Name,img,price,ownerId,ownerShop,PathImageDevice,Demension,Category,Describe) => {
  return {
      type : NAME_ACTIONS.ADD_PRODUCT.ADD_PRODUCT_ACTIONS,
      data : {
        Name: Name,
        img: img,
        price: price,
        ownerId: ownerId,
        ownerShop: ownerShop,
        PathImageDevice: PathImageDevice,
        Demension: Demension,
        Category: Category,
        Describe: Describe,
      }
    }
}