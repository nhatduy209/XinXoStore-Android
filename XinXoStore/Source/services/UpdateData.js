
import firebase from 'firebase';
import { Status } from '../Config/dataStatus';
import _ from 'underscore';
import { uploadImageToStorage } from '../Common/UploadImageToStorage'
export default class UpdateService {
  updateProfileAPI = async (data) => {
    let canUpdate = false;
    let user = {}
    var a = data.data.PathImageDevice.length ; 

    if (data.changePasswords === false) {    // EDIT INFORMATION 
      if (data.data.PathImageDevice.length > 0) {
        var fileImagePath = data.data.Avatar
        uploadImageToStorage(data.data.PathImageDevice, fileImagePath);
      }
      await firebase
        .database()
        .ref('Account/' + data.data.Key)
        .update({
          Gender: data.data.Gender,
          Email: data.data.Email,
          Username: data.data.Username,
          Age: data.data.Age,
          PhoneNum: data.data.PhoneNum,
          Avatar: data.data.Avatar
        }).then(canUpdate = true).catch(err => {
          console.log('Error update ', err);
        });
      if (canUpdate) {
        user = data.data
        return {
          data: {
            user,
            key: data.data.Key,
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
    else {
      await firebase
        .database()
        .ref('Account/' + data.data.Key)
        .update({
          Password: data.data.Password,
        }).then(canUpdate = true).catch(err => {
          console.log('Error update ', err);
        });
      if (canUpdate) {
        user = data.data
        return {
          data: {
            user,
            key: data.data.Key,
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
  }
  updateProductAPI = async ( data ) => {
    let canUpdate = false ;
    let product = {}
    if(data.data.PathImageDevice.length > 0 ){
      var  fileImagePath = data.data.img
      uploadImageToStorage(data.data.PathImageDevice , fileImagePath);
    }
    await firebase
      .database()
      .ref('NewArrivals/' + data.data.Key)
      .update({
          Name : data.data.Name,
          Rating : data.data.Rating,
          img : data.data.img, 
          liked : data.data.liked ,
          prices : data.data.prices,
          publicDate :  data.data.publicDate,
          Description : data.data.Description,
          Demension: data.data.Demension,
          Category: data.data.Category,
      }).then( canUpdate = true ).catch( err => {
        console.log('Error update ' , err);
      });
      console.log(canUpdate);
    if (canUpdate) {
      product = data.data
      return {
        data : {
          product,
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
  updateStatusOfListProduct= async (data)=>{
    var canAdd=true;
    console.log("DATA======",data);
    var result=await Promise.all(data.listItem.map( async (element) => {
      console.log(element.data)
        await firebase.database()
        .ref('NewArrivals').child(element.key)
        .update({
          Name: element.data.Name,
          Rating: element.data.Rating,
          liked: element.data.liked,
          prices: element.data.prices,
          publicDate: element.data.publicDate,
          ownerId: element.data.ownerId,
          ownerShop: element.data.ownerShop,
          img: element.data.img,
          sold: true,
          Demension:element.data.Demension,
          Category:element.data.Category,
          Description: element.data.Description,
        }).then(res=> {canAdd=true})
        .catch(()=> {canAdd =false});
        return canAdd;
    }));
    console.log(result);
    for(let i=0;i<result.length;i++){
        if(result[i]==false){
            return {
                data:{},
                status:Status.FAIL
            };
        }
    };
    return {
        data:{},
        status:Status.SUCCESS
    }
  }
}