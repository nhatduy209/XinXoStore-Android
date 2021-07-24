import { Status } from '../Config/dataStatus';
import PushData from '../services/PushData';
import ReadService from '../services/ReadData';

export default class SignUpBusiness {
  signUp = async ( data , success , failed ) => {
      var readDataService = new ReadService();
      const result  =await readDataService.signUpApi(data.email ,data.username, data.password,data.age );
      if( result.status  == Status.SUCCESS){
        var pushApi= new PushData();

        const pushResult= await pushApi.signUpApi(data.email,data.username,data.password,data.age);
        if(pushResult.status==Status.SUCCESS){
          success(pushResult);
        } 
      }
      else{
        failed(result)
      }
  }
}