import { Status } from '../Config/dataStatus';
import ReadService from '../services/ReadData';
import TestAPI from '../Views/TestAPI';

export default class ReviewsBussiness {
  getListReviews = async (data , success , fail ) => {
    var readDataService = new ReadService();

    let result  = await readDataService.getListReviewsAPI(data.ownerId);
    
    if( result.status  == Status.SUCCESS){
      success(result);
    }
    else{
      fail(result)
    }
}
}