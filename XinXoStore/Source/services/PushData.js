
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
            data:{username},
            status: Status.SUCCESS
          };
    }
    getpublucDate = () =>{
        var date = new Date();
        return date.getMonth() +'/'+date.getDate()+'/'+date.getFullYear();
    }
    addProductApi=  async(Name,img,price,ownerId,ownerShop,PathImageDevice,Demension,Category,Description)=>{
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
            Demension:Demension,
            Category:Category,
            Description: Description,
        })
        .then(()=>console.log('Data added'));
        return {
            data:{},
            status: Status.SUCCESS
          };
    }
    addReviewApi=  async(data)=>{
        // var  fileImagePath = img;
        // uploadImageToStorage(PathImageDevice , fileImagePath);
        await firebase
        .database()
        .ref('Reviews')
        .push()
        .set({
            Content: data.Content,
            Rating: data.Rating,
            PublicDate: this.getpublucDate(),
            ShopId: data.ShopId,
            UserId: data.UserId,
            Username:data.Username,
            ProductId:data.ProductId,
            Img: data.Img
        })
        .then(()=>console.log('Data added'));
        return {
            data:{},
            status: Status.SUCCESS
          };
    }
    addImageReviewAPI=async(key,PathImageDevice,Img)=>{
        var  fileImagePath = Img;
        uploadImageToStorage(PathImageDevice , fileImagePath);
        await firebase
        .database()
        .ref('Account/'+key+"/Img")
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
    addAddress=async(idAccount,data)=>{
        await firebase
        .database()
        .ref('Account/'+idAccount+"/Address")
        .push()
        .set({
            Street:data.street,
            Number:data.number,
            Commune:data.commune,
            District:data.district,
            City:data.city,
        })
        .then(()=>console.log('Data added============='));
        return {
            data:{},
            status: Status.SUCCESS
        };
    }
    createBill=async(data)=>{
        var canAdd=true;
        var result=await Promise.all(data.listItem.map( async (element) => {
            await firebase.database()
            .ref('Bill')
            .push()
            .set({
                ItemID:element.key,
                ReviewID:0,
                ShopID:element.data.ownerId,
                UserID:data.user.data.key,
                Username:data.user.data.user.Username,
                isShipped:false,
                Address:data.address.data
            }).then(res=> {canAdd=true})
            .catch(()=> {canAdd =false});
            return canAdd;
        }));
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