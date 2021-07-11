import { Status } from '../Config/dataStatus';
import PushData from '../services/PushData';
import ReadService from '../services/ReadData';

export default class AdressBusiness {
  addAdress = async ( data , success , failed ) => {
      var pushDataService = new PushData();
      console.log("data  ",data);
      const result  =await pushDataService.addAdress(data.idAccount,data.data );
      if( result.status  == Status.SUCCESS){
        success(result);
      }
      else{
        failed(result)
      }
  }
  getListAdress = async ( data , success , failed ) => {
    var readDataService = new ReadService();
    const result  =await readDataService.getListAdressApi(data.idAccount );
    if( result.status  == Status.SUCCESS){
      success(result); 
    }
    else{
      failed(result)
    }
  }
}