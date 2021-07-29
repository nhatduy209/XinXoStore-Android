import { Status } from '../Config/dataStatus';
import ReadService from '../services/ReadData';

export default class PushNotificationBusiness  {
  PushNotificationBusiness = async ( data , success , failed ) => {
    var readService= new ReadService();
    var result =readService.getUserToken(data.userId , data.username ); 

   
    if(result.status==Status.SUCCESS){
      success(pushResult);
    }
    else{
      failed({data:{
      },
      status:Status.FAIL})
    }
      
  }
}