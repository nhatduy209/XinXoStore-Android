
import firebase from 'firebase';
import { Status } from '../Config/dataStatus';
import _, { map } from 'underscore';
import {PushData} from './PushData';
import { async } from 'rxjs';
import { isObject } from 'formik';

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
      // console.log('listItem-----------------',listItem);
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
  getListAddressApi= async(idAccount)=>{
    let address=[];
    await firebase.database().ref('Account/'+idAccount).once('value',function (snapshot){
      snapshot.forEach(function (child){
        if(child.key=="Address"){
          child.forEach(function(item){
            address.push({key: item.key,data:item.toJSON()});
          });
        }
      });
    });
    return {
      data : {address
      },
      status : Status.SUCCESS
    };
  }
  getDefaultAddress=async(idAccount)=>{
    var address= new Object();
    await firebase.database().ref('Account/'+idAccount).once('value',function (snapshot){
      snapshot.forEach(function (child){
        if(child.key=="Address"){
          child.forEach(function(item){
            if(item.toJSON().Default==true){
              address=item.toJSON();
              return;
            }
          });
        }
      });
    });
    return {
      status: Status.SUCCESS,
      data:{
        address
      }
    }
  }
  
  getShoppingCart(idAccount) {
    return firebase.database().ref("Account/"+idAccount).once('value').then(function(snapshot) {
        var reads = [];
        let totalBill=0;
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
    }, function(error) {
        // The Promise was rejected.
        console.error(error);
    }).then(function(values) { 
      if(values.length>=0){
        return {
          data : values,
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
  getListIDItemShoppingCart=async(idAccount)=>{
    let listItem=[];
    await firebase.database().ref('Account/'+idAccount).once('value',function(snap){
      snap.forEach(function(child){
        if(child.key=="Cart"){
          child.forEach(function(id){
            listItem.push(id.toJSON().ItemID);
          });
          return;
        }
      })
    })
    
    return {
      data:listItem,
      status:Status.SUCCESS
    }
  }
  getListItemShoppingCart = async(listItemID)=>{

    var obj= new Object();
    var result= await Promise.all( listItemID.map(async (id)=>{
      await firebase.database().ref('NewArrivals/'+id.itemID).once('value',function(snap){
        obj= {key:id,data:snap.toJSON()};
        console.log("=============",obj);
      });
      return obj;
    }));
    
    return {
      status:Status.SUCCESS,
      data: result
    }
  }
  getListIDBill=async(idAccount)=>{
    let listID=[]
    await firebase.database().ref('Bill').once('value',function(snap){
      snap.forEach(child=>{
        if(child.toJSON().UserID==idAccount){
          listID.push({itemID:child.toJSON().ItemID,reviewID:child.toJSON().ReviewID});
          
        }
      })
    })
    return{
      status:Status.SUCCESS,
      data:listID
    }
  }
}