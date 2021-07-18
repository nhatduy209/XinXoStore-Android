import firebase from 'firebase';
import { async } from 'rxjs';
import { Status } from '../Config/dataStatus';
import { deleteImageFromStorage } from '../Common/DeleteImageFromStorage';

export default class  PushData{
    deleteProductApi=  async(imageNamePath,key)=>{
      console.log('key',key);
        let removed=false;
        await firebase
        .database()
        .ref('NewArrivals/'+ key)
        .remove()
        .then(()=>{
            console.log('Data removed',key);
            removed=true;
            });
        if(removed){
            deleteImageFromStorage(imageNamePath);
            return {
              data:{},
              status: Status.SUCCESS
            };
          }else{
            return {
              data:{
              },
              status:Status.FAIL
            };
        }
    }
}