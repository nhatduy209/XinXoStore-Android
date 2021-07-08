import { Status } from '../Config/dataStatus';
import ReadService from '../services/ReadData';
import TestAPI from '../Views/TestAPI';

export default class NewArrivalsBusiness {
  getListNewArrivals = async (data , success , fail ) => {
      var readDataService = new ReadService();
      var testApi = new TestAPI();

      let result  = await readDataService.getListArrivalsAPI(data.sortUp);
      
      if( result.status  == Status.SUCCESS){
        success(result);
      }
      else{
        fail(result)
      }
}
}