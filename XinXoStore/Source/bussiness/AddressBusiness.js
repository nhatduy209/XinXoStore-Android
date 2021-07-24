import { async } from 'rxjs';
import { Status } from '../Config/dataStatus';
import PushData from '../services/PushData';
import ReadService from '../services/ReadData';

export default class AddressBusiness {
  addAddress = async ( data , success , failed ) => {
      var pushDataService = new PushData();
      const result  =await pushDataService.addAddress(data.idAccount,data.data );
      if( result.status  == Status.SUCCESS){
        success(result);
      }
      else{
        failed(result)
      }
  }
  getListAddress = async ( data , success , failed ) => {
    var readDataService = new ReadService();
    const result  =await readDataService.getListAddressApi(data.idAccount );
    if( result.status  == Status.SUCCESS){
      success(result); 
    }
    else{
      failed(result)
    }
  }
  getDefaultAddress=async(data,success,failed)=>{
    var readDataService = new ReadService();
    const result  =await readDataService.getDefaultAddress(data.idAccount );
    if( result.status  == Status.SUCCESS){
      success(result); 
    }
    else{
      failed(result)
    }
  }
}