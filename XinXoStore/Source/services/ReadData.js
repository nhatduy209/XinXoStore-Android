
import firebase from 'firebase';
import { Status } from '../Config/dataStatus';
import _, { map } from 'underscore';
import {PushData} from './PushData';

export default class ReadService {
  verifyLoginApi = async(username , password) => {
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
    let key = "";
    let item = {};
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
            key = child.key;
            item= myJson;
            listItem.push({key,item});
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
    let key = "";
    let item = {};
    var listItem = [];
    await firebase
      .database()
      .ref('NewArrivals/')
      .once('value', function (snapshot) {
        snapshot.forEach(function (child) {
          //đặt ddieuf kiện
          var myJson = child.toJSON();
          key = child.key;
          item= myJson;
          listItem.push({key: key,...item});
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