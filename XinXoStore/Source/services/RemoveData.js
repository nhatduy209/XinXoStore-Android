import firebase from 'firebase';
import { async } from 'rxjs';
import { Status } from '../Config/dataStatus';

export default class RemoveData{
    removeItemShoppingCart=async(data)=>{
        await firebase.database().ref('Account/'+data.idAccount).child("Cart").once('value',function(snap){
            snap.forEach(element=>{
                if(element.toJSON().ItemID==data.id){
                    firebase.database().ref('Account/'+data.idAccount).child("Cart").child(element.key).remove();
                }
            })
        })
        return {
            status: Status.SUCCESS,
        }
    }
}