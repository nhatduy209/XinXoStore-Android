import { Status } from '../Config/dataStatus';
import DeleteData from '../services/DeleteData';

export default class DeleteReviewBusiness {
  deleteReview = async ( data , success , failed ) => {
    var deleteApi= new DeleteData();

    const result= await deleteApi.deleteReviewApi(data.imageNamePath,data.key);
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