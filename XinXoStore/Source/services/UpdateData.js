
import firebase from 'firebase';
import { Status } from '../Config/dataStatus';
import _, { map } from 'underscore';
export default class UpdateService {
  updateProfileAPI = async ( data ) => {
    let canUpdate = false ;
    console.log("SERVICE ", username , password);
    await firebase
      .database()
      .ref('Account/' + data)
      .update({
          data 
      }).then( canUpdate = true ).catch( err => {
        console.log('Error update ' , err);
      });
    if (canUpdate) {
      return {
        data : {
          user
        },
        status : Status.SUCCESS
      };
    } else {
      return {
        data : {
        },
        status : Status.FAIL,
      }
    }
  }
}