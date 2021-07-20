import { Status } from '../Config/dataStatus';
import PushData from '../services/PushData';
import ReadhData from '../services/ReadData';

export default class NewArrivalsBusiness {
  addToShoppingCart = async (data,success , fail ) => {
      var pushDataService = new PushData();
      // console.log('DATA BUSINESS --------------', data);
      let result  = await pushDataService.addToShoppingCart(data.idAccount,data.itemID);
      // console.log('DATA BUSINESS --------------', data);
      if( result.status  == Status.SUCCESS){
        success(result);
      }
      else{
        fail(result)
      }
  }
  getAllProduct= async (data,success,fail)=>{
    var readDataService= new ReadhData();
      let result  = await readDataService.getShoppingCart(data.idAccount);
      if( result.status  == Status.SUCCESS){
        success(result);
      }
      else{
        fail(result)
      }
  }
}