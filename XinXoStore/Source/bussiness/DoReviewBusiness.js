import { Status } from '../Config/dataStatus';
import PushData from '../services/PushData';

export default class AddReviewBusiness {
    addReview = async ( data , success , failed ) => {
    var pushApi= new PushData();

    const pushResult= await pushApi.addReviewApi(data);
    if(pushResult.status==Status.SUCCESS){
      success(pushResult);
    }
    else{
      failed({data:{
      },
      status:Status.FAIL})
    }
      
  }
}