import { Status } from '../Config/dataStatus';
import UpdateService from '../services/UpdateData';

export default class EditProductBusiness {
  editProduct = async ( data , success , fail ) => {
      var updateDataService = new UpdateService();
      const result  =await updateDataService.updateProductAPI(data)
      if( result.status  == Status.SUCCESS){
        success(result);
      }
      else{
        fail(result)
      }
}
}