import { Status } from '../Config/dataStatus';
import ReadService from '../services/ReadData';
import TestAPI from '../Views/TestAPI';

export default class DetailItemBusiness {
  getArrivalItem = async (Name,success , fail ) => {
      var readDataService = new ReadService();
      var testApi = new TestAPI();

      let result  = await readDataService.getArrivalItemAPI(Name);
      
      if( result.status  == Status.SUCCESS){
        success(result);
      }
      else{
        fail(result)
      }
}
}