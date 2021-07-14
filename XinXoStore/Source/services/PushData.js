
import firebase from 'firebase';
import { async } from 'rxjs';
import { Status } from '../Config/dataStatus';

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