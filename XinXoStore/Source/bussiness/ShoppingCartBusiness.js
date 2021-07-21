import { Status } from '../Config/dataStatus';
import PushData from '../services/PushData';
import ReadData from '../services/ReadData';
import RemoveData from '../services/RemoveData';

export default class NewArrivalsBusiness {
  addToShoppingCart = async (data,success , fail ) => {
      var pushDataService = new PushData();
      let result  = await pushDataService.addToShoppingCart(data.idAccount,data.itemID);
      if( result.status  == Status.SUCCESS){
        success(result);
      }
      else{
        fail(result)
      }
  }
  getAllProduct= async (data,success,fail)=>{
    var readDataService= new ReadData();
      let result  = await readDataService.getShoppingCart(data.idAccount);
      if( result.status  == Status.SUCCESS){
        success(result);
      }
      else{
        fail(result);
      }
  }
  deleteItem= async(data,success,fail)=>{
    var removeDataService= new RemoveData();
    var readDataService= new ReadData();
    let result  = await removeDataService.removeItemShoppingCart(data);
    if( result.status  == Status.SUCCESS){
      let listItem= await readDataService.getShoppingCart(data.idAccount);
      if(listItem.status==Status.SUCCESS){
        success(listItem);
      }
      else{
        fail(listItem);
      }
    }
    else{
      fail(result);
    }
  }
  
}