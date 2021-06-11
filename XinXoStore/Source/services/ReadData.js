
import firebase from 'firebase';
import { Status } from '../Config/dataStatus';
export default class ReadService {
  verifyLoginApi = async (username , password) => {
    let canLogin = false ; 
    console.log("SERVICE ", username , password);
    await firebase
      .database()
      .ref('Account/')
      .once('value', function (snapshot) {
        snapshot.forEach(function (child) {
          var myJson = child.toJSON();
          console.log(myJson.Username + ' ' + myJson.Password);
          if (myJson.Username === username && myJson.Password === password) {
            canLogin = true;
          }
        });
      });
    if (canLogin === true) {
      return {
        data : {
          username, 
          password,
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