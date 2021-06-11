import { Status } from '../Config/dataStatus';
import ReadService from '../services/ReadData';

export default class LoginBusiness {
  verifyLogin = async ( data , success , fail ) => {
      var readDataService = new ReadService();
      console.log('DATA BUSINESS --------------', data);
      const result  =await readDataService.verifyLoginApi(data.username , data.password )
      console.log('RESULT LOGIN BUSINESS --------------' ,result);
      if( result.status  == Status.SUCCESS){
        success(result);
      }
      else{
        fail(result)
      }
}
}