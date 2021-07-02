
import firebase from 'firebase';
import { Status } from '../Config/dataStatus';
import _, { map } from 'underscore';
export default class ReadService {
  verifyLoginApi = async (username , password) => {
    let canLogin = false ; 
    let Email = "";
    let avatarUser = "";
    console.log("SERVICE ", username , password);
    await firebase
      .database()
      .ref('Account/')
      .once('value', function (snapshot) {
        snapshot.forEach(function (child) {
          var myJson = child.toJSON();
          console.log(myJson.Username + ' ' + myJson.Password);
          if (myJson.Username === username && myJson.Password === password) {
            Email = myJson.Email;
            avatarUser = myJson.Avatar
            canLogin = true;
          }
        });
      });
    if (canLogin === true) {
      return {
        data : {
          username, 
          password,
          Email,
          avatarUser,
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

  getListArrivalsAPI = async (sortUp) => {
    var listItem = [];
    await firebase
      .database()
      .ref('NewArrivals/')
      .once('value', function (snapshot) {
        snapshot.forEach(function (child) {
          var myJson = child.toJSON();
          listItem.push(myJson);
        });
      });
    if (listItem.length > 0 ) {
      console.log('listItem-----------------',listItem);
      listItem =  _.sortBy(listItem,'prices')
      if(!sortUp){
        listItem.reverse();
      }
      return {
        data : {listItem},
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