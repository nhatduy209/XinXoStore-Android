import { Status } from '../Config/dataStatus';
import DeleteData from '../services/DeleteData';

export default class AddProductBusiness {
  deleteProduct = async ( data , success , failed ) => {
    // console.log('DATA BUSINESS --------------', data);
    var deleteApi= new DeleteData();

    const result= await deleteApi.deleteProductApi(data.imageNamePath,data.key);
    // console.log('push :',pushResult);
    if(result.status==Status.SUCCESS){
      success(result);
    }
    else{
      failed({data:{
      },
      status:Status.FAIL})
    }
      
  }
}