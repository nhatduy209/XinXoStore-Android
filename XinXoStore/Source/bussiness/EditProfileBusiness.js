import { Status } from '../Config/dataStatus';
import UpdateService from '../services/UpdateData';

export default class EditProfileBusiness {
  verifyLogin = async ( data , success , fail ) => {
      var updateDataService = new UpdateService();
      const result  =await updateDataService.updateProfileAPI(data)
      if( result.status  == Status.SUCCESS){
        success(result);
      }
      else{
        fail(result)
      }
}
}