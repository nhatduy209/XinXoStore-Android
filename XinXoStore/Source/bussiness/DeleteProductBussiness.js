import { Status } from '../Config/dataStatus';
import DeleteData from '../services/DeleteData';

export default class AddProductBusiness {
  deleteProduct = async ( data , success , failed ) => {
    var deleteApi= new DeleteData();

    const result= await deleteApi.deleteProductApi(data.imageNamePath,data.key);
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