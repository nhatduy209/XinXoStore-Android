
import firebase from 'firebase';
import { Status } from '../Config/dataStatus';
import _, { map } from 'underscore';
import {PushData} from './PushData';

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
          console.log(myJson.Username + ' ' + myJson.Password);
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
  getListAdressApi= async(idAccount)=>{
    let adress=[];
    console.log("SERVICE GET LIST ADRESS",idAccount);
    console.log('Account/'+idAccount+'/Adress/');
    await firebase.database().ref('Account/'+idAccount).once('value',function (snapshot){
      // console.log("KEY :",snapshot.key);
      snapshot.forEach(function (child){
        if(child.key=="Adress"){
          console.log("JSON: ",child.toJSON(),child.key);
          child.forEach(function(item){
            adress.push(item.toJSON());
          });
        }
      });
    });
    console.log(adress);
    if (adress.length > 0 ) {
      console.log('listItem-----------------',adress);
      return {
        data : {adress},
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