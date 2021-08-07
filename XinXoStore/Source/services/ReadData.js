
import firebase from 'firebase';
import { Status } from '../Config/dataStatus';
import _, { map } from 'underscore';
import { PushData } from './PushData';
import { async } from 'rxjs';
import { isObject } from 'formik';
import {sendNotification} from '../Common/PushNotification'

export default class ReadService {
  verifyLoginApi = async(username , password) => {
    
    let canLogin = false ; 
    let Email = "";
    let key = "";
    let user = {};
    await firebase
      .database()
      .ref('Account/')
      .once('value', function (snapshot) {
        snapshot.forEach(function (child) {
          var myJson = child.toJSON();
          if (myJson.Username === username && myJson.Password === password) {
            canLogin = true;
            key = child.key;
            user = myJson;
          }
        });
      });
    if (canLogin === true) {
      return {
        data: {
          user,
          key,
        },
        status: Status.SUCCESS
      };
    } else {
      return {
        data: {
        },
        status: Status.FAIL,
      }

    }
  }
  signUpApi = async (email, username, password, age) => {
    let canSignUp = true;
    await firebase
      .database()
      .ref('Account/')
      .once('value', function (snapshot) {
        snapshot.forEach(function (child) {
          var myJson = child.toJSON();
          if (myJson.Email === email) {
            canSignUp = false;
          }
        });
      });

    if (canSignUp === true) {
      return {
        data: {},
        status: Status.SUCCESS
      };
    } else {
      return {
        data: {
        },
        status: Status.FAIL
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
          if (myJson.Name === Name) {
            key = child.key;
            item = myJson;
            listItem.push({ key, item });
          }
        });
      });
    if (listItem.length > 0) {
      return {
        data: { listItem },
        status: Status.SUCCESS
      };
    } else {
      return {
        data: {},
        status: Status.FAIL,
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
          item = myJson;
          listItem.push({ key: key, ...item });
        });
      });
    if (listItem.length > 0) {
      listItem = _.sortBy(listItem, 'prices')
      if (!sortUp) {
        listItem.reverse();
      }
      return {
        data: {
          listItem
        },
        status: Status.SUCCESS
      };
    } else {
      return {
        data: {},
        status: Status.FAIL,
      }
    }
  }
  getListReviewsAPI = async (ownerId,) => {
    let key = "";
    let item = {};
    var listItem = [];
    await firebase
      .database()
      .ref('Reviews/')
      .once('value', function (snapshot) {
        snapshot.forEach(function (child) {
          //đặt ddieuf kiện
          var myJson = child.toJSON();
          key = child.key;
          item= myJson;
          if(item.ShopId === ownerId){
            listItem.push({key: key,...item});
          }
          
        });
      });
    if (listItem.length > 0) {
      return {
        data: {
          listItem
        },
        status: Status.SUCCESS
      };
    } else {
      return {
        data: {},
        status: Status.FAIL,
      }
    }
  }
  getListAddressApi= async(idAccount)=>{
    console.log("get list address============",idAccount)
    let address=[];
    await firebase.database().ref('Account/'+idAccount).once('value',function (snapshot){
      snapshot.forEach(function (child){
        if(child.key=="Address"){
          child.forEach(function(item){
            address.push({key: item.key,data:item.toJSON()});
          });
        }
      });
    }).then(res=>{
      return {
        data: {
          address
        },
        status: Status.SUCCESS
      };
    }).catch(err=>{
      return {
        data : {},
        status : Status.FAIL
      };
    })
    
  }
  getDefaultAddress=async(idAccount)=>{
    var address= new Object();
    let error=false;
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
    }).catch(err=>{
      return error=true
    })
    if(error==false){
      return {
        status: Status.SUCCESS,
        data: {
          address
        }
      }
    } else{
      return {
        status: Status.FAIL,
        data:{
          address
        }
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
                });
                reads.push(promise);
              })
            }
            
        });
        return Promise.all(reads);
    }, function(error) {
    }).then(function(values) { 
      return {
        data : values,
        status : Status.SUCCESS,
      }
    }).catch(err=>{
      return {
          data : {},
          status : Status.FAIL,
        }
    })
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
    }).then(res=>{
      return {
        data: listItem,
        status: Status.SUCCESS
      }
    }).catch(err=>{
      return {
        data: {},
        status: Status.FAIL
      }
    })
    
    
  }
  getListItemShoppingCart = async(listItemID)=>{
    var obj= new Object();
    var result= await Promise.all( listItemID.map(async (id)=>{
      await firebase.database().ref('NewArrivals/'+id.itemID).once('value',function(snap){
        obj= {key:id,data:snap.toJSON()};
      });
      return obj;
    }));
    
    return {
      status:Status.SUCCESS,
      data: result
    }
  }
  getListIDBill=async(idAccount)=>{
    let listID=[];
    let noNewReview=0;
    let canGet=true;
    await firebase.database().ref('Bill').once('value',function(snap){
      snap.forEach(child=>{
        if(child.toJSON().UserID==idAccount){
          listID.push({itemID:child.toJSON().ItemID,reviewID:child.toJSON().ReviewID});
        }
        if(child.toJSON().ReviewID==0){
          noNewReview+=1;
        }
      })
    }).then(res=>{
      return true;
    }).catch(err=>{
      return false;
    })
    if(canGet==true){
      return{
        status:Status.SUCCESS,
        data:{
          listID:listID,
          noNewReview:noNewReview
        }
      }
    }else{
      return{
        status:Status.FAIL,
        data:{}
      }
    }
  }

  getPublisherInfo = async (ownerId) => {
    var publisher = {}
    await firebase
      .database()
      .ref('Account/')
      .once('value', function (snapshot) {
        snapshot.forEach(function (child) {
          if (child.key === ownerId) {
            var myJson = child.toJSON();
            publisher = myJson;
          }
        });
      });

    return {
      data: publisher,
      status: Status.SUCCESS
    }
  }
  checkToAddToCart= async(idAccount,itemID)=>{
    let canAdd=true;
    await firebase.database().ref('Account/'+idAccount).child('Cart').once('value',snap=>{
      snap.forEach(child=>{
        console.log("snap===================",child.toJSON());
        if(child.toJSON().ItemID==itemID){
          canAdd=false;
        }
      })
    });
    if(canAdd==true){
      return {
        success:Status.SUCCESS
      }
    }else{
      return {
        success:Status.FAIL
      }
    }
  }
}