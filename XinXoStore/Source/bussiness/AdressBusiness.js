import { Status } from '../Config/dataStatus';
import PushData from '../services/PushData';
import ReadService from '../services/ReadData';

export default class AdressBusiness {
  addAdress = async ( data , success , failed ) => {
      var readDataService = new ReadService();
      const result  =await readDataService.signUpApi(data.email ,data.username, data.password,data.age );
      if( result.status  == Status.SUCCESS){
        var pushApi= new PushData();
        const pushResult= await pushApi.signUpApi(data.email,data.username,data.password,data.age);
        console.log('push :',pushResult);
        if(pushResult.status==Status.SUCCESS){
          success(pushResult);
        } 
      }
      else{
        failed(result)
      }
  }
  getListAdress = async ( data , success , failed ) => {
    var readDataService = new ReadService();
    const result  =await readDataService.getListAdressApi(data.idAccount );
    if( result.status  == Status.SUCCESS){
      success(result); 
    }
    else{
      failed(result)
    }
  }
}