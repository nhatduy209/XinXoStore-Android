import { Status } from '../Config/dataStatus';
import PushData from '../services/PushData';
import ReadService from '../services/ReadData';

export default class MessageBusiness {
    getListMessage = async ( data,  success , failed ) => {
    var readData = new ReadService();
    console.log('DATE-----' , data )
    const result = await readData.getListMessage(data.username , data.usernameChatting);
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

  getBubbleMessage = async ( data,  success , failed ) => {
    var readData = new ReadService();
    const result = await readData.getBubbleMessage(data.usernameLogin);
    if(result.status===Status.SUCCESS){
      success(result);
    }
    else{
      failed(result)
    }
      
  }
}