import { Status } from '../Config/dataStatus';
import PushData from '../services/PushData';
import ReadService from '../services/ReadData';

export default class MessageBusiness {
    getListMessage = async (  success , failed ) => {
    var readData = new ReadService();

    const result = await readData.getListMessage();
    if(result.status===Status.SUCCESS){
      success(result);
    }
    else{
      failed(result)
    }
      
  }

  sendMessage = async ( data,  success , failed ) => {
    var pushData  = new PushData();
    console.log('BUSSINESSS ' , data.user);
    const result = await pushData.sendMessage(data);
    if(result.status===Status.SUCCESS){
      success(result);
    }
    else{
      failed(result)
    }
      
  }
}