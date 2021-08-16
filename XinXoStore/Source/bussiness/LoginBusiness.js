import { async } from 'rxjs';
import { Status } from '../Config/dataStatus';
import ReadService from '../services/ReadData';
import RemoveData from '../services/RemoveData';
import PushData from '../services/PushData';
export default class LoginBusiness {
  verifyLogin = async ( data , success , fail ) => {
      var readDataService = new ReadService();
      const result  =await readDataService.verifyLoginApi(data.username , data.password )
      if( result.status  == Status.SUCCESS){
        const existToken= await readDataService.checkExistToken(data.token,data.username)
        if (existToken.status==Status.FAIL){
          var pushApi= new PushData();
          await pushApi.addUserToken(data.token,data.username)
        }
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
    if( login.status  == Status.SUCCESS){
      const existToken= await readDataService.checkExistToken(data.token,data.username)
      if (existToken.status==Status.FAIL){
        var pushApi= new PushData();
        await pushApi.addUserToken(data.token,data.username)
      }
      success(login);
    }
    else{
      failed(login)
    }
  }
  removeToken= async(data,success,failed)=>{
    var removeService= new RemoveData()
    var readDataService = new ReadService();
    const existToken= await readDataService.getTokenKeyToRemove(data.token,data.username)
    if(existToken.status==Status.SUCCESS ){
      if(existToken.data.count===1){
        await removeService.removeTokenWithRef(data.token)
      }
      else{
        await removeService.removeTokenWithUsername(data.token,existToken.data.key)
      }
    }
    else{
      failed(existToken)
    }
    success(existToken)
  }
}