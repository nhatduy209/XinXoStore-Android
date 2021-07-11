
import firebase from 'firebase';
import { Status } from '../Config/dataStatus';
import _, { map } from 'underscore';
import {PushData} from './PushData';
import { async } from 'rxjs';

export default class ReadService {
  verifyLoginApi = async (username , password) => {
    let canLogin = false ; 
    let Email = "";
    let key = "";
    let user = {};
    console.log("SERVICE ", username , password);
    await firebase
      .database()
      .ref('Account/')
      .once('value', function (snapshot) {
        snapshot.forEach(function (child) {
          var myJson = child.toJSON();
          // console.log(myJson.Username + ' ' + myJson.Password);
          if (myJson.Username === username && myJson.Password === password) {
            canLogin = true;
            key = child.key ;
            user = myJson;
          }
        });
      });
    if (canLogin === true) {
      return {
        data : {
          user,
          key,
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
  signUpApi= async(email,username,password,age)=>{
    let canSignUp=true;
    console.log("SERVICE ",email,username,password,age);
    await firebase
      .database()
      .ref('Account/')
      .once('value',function (snapshot){
        snapshot.forEach(function (child){
          var myJson=child.toJSON();
          console.log(myJson.Email);
          if(myJson.Email===email ){
              canSignUp=false;
          }
        });
      });
    
    if(canSignUp===true){
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

  // truyền đô đây nè mẹ
  getArrivalItemAPI = async (Name) => {
    var listItem = [];
    await firebase
      .database()
      .ref('NewArrivals/')
      .once('value', function (snapshot) {
        snapshot.forEach(function (child) {
          //đặt ddieuf kiện
          var myJson = child.toJSON();
          if(myJson.Name === Name) {
            console.log('MY JSON -----------' , myJson);
            listItem.push(myJson);
          }
        });
      });
    if (listItem.length > 0 ) {
      console.log('listItem-----------------',listItem);
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
  getListArrivalsAPI = async (sortUp) => {
    var listItem = [];
    await firebase
      .database()
      .ref('NewArrivals/')
      .once('value', function (snapshot) {
        snapshot.forEach(function (child) {
          //đặt ddieuf kiện
          var myJson = child.toJSON();
          var item= {
            key:child.key,
            data:myJson
          };
          listItem.push(item);
        });
      });
    if (listItem.length > 0 ) {
      console.log('listItem-----------------',listItem);
      listItem =  _.sortBy(listItem,'prices')
      if(!sortUp){
        listItem.reverse();
      }
      return {
        data : {
          listItem
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
  getListAdressApi= async(idAccount)=>{
    let adress=[];
    await firebase.database().ref('Account/'+idAccount).once('value',function (snapshot){
      snapshot.forEach(function (child){
        if(child.key=="Adress"){
          child.forEach(function(item){
            adress.push(item.toJSON());
          });
        }
      });
    });
    // console.log("resultttt",adress);
    if (adress.length > 0 ) {
      return {
        data : {
          adress:adress,
          length:adress.length
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
  
  loadMeetings(idAccount) {
    console.log("idaccount",idAccount);
    //$('#meetingsTable').empty();
    return firebase.database().ref("Account/"+idAccount).once('value').then(function(snapshot) {
        var reads = [];
        snapshot.forEach(function(childSnapshot) {
            if(childSnapshot.key=="Cart"){
              childSnapshot.forEach(function(child){
                var promise = firebase.database().ref('NewArrivals/'+child.toJSON().ItemID).once('value').then(function(snap) {
                  // The Promise was fulfilled.
                  var myJson = snap.toJSON();
                    var item= {
                      key:snap.key,
                      data:myJson
                    };
                    reads.push(item);
                  return item;
                },
                 function(error) {
                    // The Promise was rejected.
                    console.error(error);
                });
                reads.push(promise);
              })
            }
            
        });
        return Promise.all(reads);
//      ^^^^^^^^^^^^^^^^^
    }, function(error) {
        // The Promise was rejected.
        console.error(error);
    }).then(function(values) { 
      console.log("values la",values);
      if(values.length>0){
        return {
          data : {
            values:values,
            length:values.length
          },
          status : Status.SUCCESS,
        }
      }
      else{
        return {
          data : {},
          status : Status.FAIL,
        }
      }
    });
}
  
}