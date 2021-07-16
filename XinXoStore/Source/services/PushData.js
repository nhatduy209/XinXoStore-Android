
import firebase from 'firebase';
import { async } from 'rxjs';
import { Status } from '../Config/dataStatus';
import { uploadImageToStorage } from '../Common/UploadImageToStorage';

export default class  PushData{
    signUpApi=  async(email,username,password,age)=>{
        await firebase
        .database()
        .ref('Account')
        .push()
        .set({
            Email:email,
            Username:username,
            Password:password,
            Age:age
        })
        .then(()=>console.log('Data added'));
        return {
            data:{},
            status: Status.SUCCESS
          };
    }
    getpublucDate = () =>{
        var date = new Date();
        return date.getMonth() +'/'+date.getDate()+'/'+date.getYear();
    }
    addProductApi=  async(Name,img,price,ownerId,ownerShop,PathImageDevice)=>{
        // console.log(PathImageDevice)
        var  fileImagePath = img;
        uploadImageToStorage(PathImageDevice , fileImagePath);
        await firebase
        .database()
        .ref('NewArrivals')
        .push()
        .set({
            Name: Name,
            Rating: 3,
            liked: false,
            prices: price,
            publicDate: this.getpublucDate(),
            ownerId: ownerId,
            ownerShop: ownerShop,
            img: img,
            sold: false,
        })
        .then(()=>console.log('Data added'));
        return {
            data:{},
            status: Status.SUCCESS
          };
    }
    addToShoppingCart=async(idAccount,itemID)=>{
        await firebase
        .database()
        .ref('Account/'+idAccount+"/Cart")
        .push()
        .set({
            ItemID:itemID
        })
        .then(()=>console.log('Data added============='));
        return {
            data:{},
            status: Status.SUCCESS
        };
    }
}