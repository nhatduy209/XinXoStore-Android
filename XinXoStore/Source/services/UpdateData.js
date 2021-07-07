
import firebase from 'firebase';
import { Status } from '../Config/dataStatus';
import {FilePath} from '../Config/FilePath'
import _, { map } from 'underscore';
import storage from '@react-native-firebase/storage'; 
import {uploadImageToStorage} from '../Common/UploadImageToStorage'
export default class UpdateService {
  updateProfileAPI = async ( data ) => {
    let canUpdate = false ;
    let user = {}
    console.log("HERE UPDATE PROFILE --------" , data );
    if(data.data.PathImageDevice.length > 0 ){
      var  fileImagePath = data.data.Avatar
      uploadImageToStorage(data.data.PathImageDevice , fileImagePath);
    }
    await firebase
      .database()
      .ref('Account/' + data.data.Key)
      .update({
          Gender : data.data.Gender,
          Email : data.data.Email,
          Username : data.data.Username, 
          Age : data.data.Age ,
          PhoneNum : data.data.PhoneNum,
          Avatar :  data.data.Avatar
      }).then( canUpdate = true ).catch( err => {
        console.log('Error update ' , err);
      });
    if (canUpdate) {
      user = data.data
      return {
        data : {
          user,
          key : data.data.Key,
        },
        status : Status.SUCCESS
      };
    } else {
      return {
        data : {},
        status : Status.FAIL,
      }
    }
  }
}