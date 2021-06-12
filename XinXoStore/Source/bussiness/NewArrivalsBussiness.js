import { Status } from '../Config/dataStatus';
import ReadService from '../services/ReadData';
import TestAPI from '../Views/TestAPI';

export default class NewArrivalsBusiness {
  getListNewArrivals = async (success , fail ) => {
      var readDataService = new ReadService();
      var testApi = new TestAPI();

      console.log('getListNewArrivals--------------')
      const result  = await readDataService.getListArrivalsAPI();
      
      for( let i = 0 ; i < result.data.listItem.length ; i++) 
      {
        console.log('result.data.listItem[i].img', result.data.listItem[i].img)
        testApi.myPromise(result.data.listItem[i].img).then(res => {
          result.data.listItem[i].img = res ;
          console.log('ITEM.IMG -------' ,result.data.listItem[i].img);
          console.log('RES -------' , res )
        }).catch(err => console.log("ERR IMG ------" , err));
      }

      if( result.status  == Status.SUCCESS){
        success(result);
      }
      else{
        fail(result)
      }
}
}