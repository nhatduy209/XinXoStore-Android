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

export const deleteProduct = ( imageNamePath,key ) => {
  console.log('THIS IS DELETE PRODUCT --------- ' )
  console.log(imageNamePath,key);
    return {
      type : NAME_ACTIONS.DELETE_PRODUCT.DELETE_PRODUCT_ACTIONS,
      data : {
        imageNamePath: imageNamePath,
        key: key,
      } ,
    }
}

export const addProduct = (Name,img,price,ownerId,ownerShop,PathImageDevice) => {
  console.log('THIS IS ADD PRODUCT --------- ')
  console.log(Name,img,price,ownerId,ownerShop,PathImageDevice )
    return {
      type : NAME_ACTIONS.ADD_PRODUCT.ADD_PRODUCT_ACTIONS,
      data : {
        Name: Name,
        img: img,
        price: price,
        ownerId: ownerId,
        ownerShop: ownerShop,
        PathImageDevice: PathImageDevice,
      }
    }
}