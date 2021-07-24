import { Status } from '../Config/dataStatus';
import ReadService from '../services/ReadData';

export default class PublisherInfoBusiness  {
  getPublisherInfo  = async ( data , success , fail ) => {
      var readDataService = new ReadService();
      const result  =await readDataService.getPublisherInfo(data.ownerId)
      if( result.status  == Status.SUCCESS){
        success(result);
      }
      else{
        fail(result)
      }
}
}