import { Status } from '../Config/dataStatus';
import ReadService from '../services/ReadData';
import TestAPI from '../Views/TestAPI';

export default class GetItemsForUserBusiness {
  getItemForUser = async (data , success , fail ) => {
      var readDataService = new ReadService();

      let result  = await readDataService.getItemForUser(data.idOwner);
      if( result.status  == Status.SUCCESS){
        success(result);
      }
      else{
        fail(result)
      }
}
}