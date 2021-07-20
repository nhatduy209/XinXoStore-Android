import { Status } from '../Config/dataStatus';
import PushData from '../services/PushData';
import ReadService from '../services/ReadData';

export default class AddProductBusiness {
  addProduct = async ( data , success , failed ) => {
    // console.log('DATA BUSINESS --------------', data);
    var pushApi= new PushData();

    const pushResult= await pushApi.addProductApi(data.Name,data.img,data.price,data.ownerId,data.ownerShop,data.PathImageDevice,data.Demension,data.Category,data.Describe);
    // console.log('push :',pushResult);
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