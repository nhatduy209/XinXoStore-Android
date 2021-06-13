import { Status } from '../Config/dataStatus';
import ReadService from '../services/ReadData';
import TestAPI from '../Views/TestAPI';

export default class NewArrivalsBusiness {
  getListNewArrivals = async (success , fail ) => {
      var readDataService = new ReadService();
      var testApi = new TestAPI();

      console.log('getListNewArrivals--------------')
      let result  = await readDataService.getListArrivalsAPI();
      
      if( result.status  == Status.SUCCESS){
        success(result);
      }
      else{
        fail(result)
      }
}
}