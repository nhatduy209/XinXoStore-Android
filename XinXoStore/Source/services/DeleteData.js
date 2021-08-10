import firebase from 'firebase';
import { async } from 'rxjs';
import { Status } from '../Config/dataStatus';
import { deleteImageFromStorage } from '../Common/DeleteImageFromStorage';

export default class  PushData{
    deleteProductApi=  async(imageNamePath,key)=>{
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
    deleteReviewApi=  async(imageNamePath,key)=>{
      console.log(imageNamePath)
      let removed=false;
      await firebase
      .database()
      .ref('Reviews/'+ key)
      .remove()
      .then(()=>{
          console.log('Data removed',key);
          removed=true;
          });
      if(removed){
        imageNamePath.map(img=>{
          console.log(img)
          deleteImageFromStorage(img)}) 
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