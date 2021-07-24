import { Status } from '../Config/dataStatus';
import PushData from '../services/PushData';
import ReadService from '../services/ReadData';

export default class AddProductBusiness {
  addProduct = async ( data , success , failed ) => {
    var pushApi= new PushData();

    const pushResult= await pushApi.addProductApi(data.Name,data.img,data.price,data.ownerId,data.ownerShop,data.PathImageDevice,data.Demension,data.Category,data.Describe);
    if(pushResult.status==Status.SUCCESS){
      success(pushResult);
    }
    else{
      failed({data:{
      },
      status:Status.FAIL})
    }
      
  }
}