import { async } from 'rxjs';
import { Status } from '../Config/dataStatus';
import ReadService from '../services/ReadData';
import PushData
 from '../services/PushData';
export default class LoginBusiness {
  verifyLogin = async ( data , success , fail ) => {
      var readDataService = new ReadService();
      const result  =await readDataService.verifyLoginApi(data.username , data.password )
      if( result.status  == Status.SUCCESS){
        success(result);
      }
      else{
        fail(result)
      }
  }
  loginWithGoogle=async(data,success,failed)=>{
    var readDataService = new ReadService();
    const checkSignUp  =await readDataService.signUpApi(data.email ,data.username, data.password,data.age );
    if( checkSignUp.status  == Status.SUCCESS){
      var pushApi= new PushData();
      await pushApi.signUpApi(data.email,data.username,data.password,data.age);
    }
    const login=await readDataService.verifyLoginApi(data.username,data.password);
    if(login.status==Status.SUCCESS){
      success(login);
    }
    else{
      failed(login);
    }
  }
}