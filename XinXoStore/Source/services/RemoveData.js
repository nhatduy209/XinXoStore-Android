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
    removeShoppingCart=async(data)=>{
        let result=await firebase.database().ref('Account/'+data.user.data.key).child("Cart").remove()
        .then(()=>{
            return true;
        })
        .catch(()=>{
            return false;
        });
        if(result==true){
            return {
                data:{},
                status:Status.SUCCESS
            }
        }else{
            return {
                data:{},
                status:Status.FAIL
            }
        }
    }
    removeTokenWithRef=async(token)=>{
        let result=await firebase.database().ref("Notifications").child(token).remove()
        .then(()=>{
            return true;
        })
        .catch(()=>{
            return false;
        });
        if(result==true){
            return {
                data:{},
                status:Status.SUCCESS
            }
        }else{
            return {
                data:{},
                status:Status.FAIL
            }
        }
    }
    
    removeTokenWithUsername=async(token,key)=>{
        console.log("removw")
        let result=await firebase.database().ref("Notifications").child(token).child(key).remove()
        .then(()=>{
            return true;
        })
        .catch(()=>{
            return false;
        });
        if(result==true){
            return {
                data:{},
                status:Status.SUCCESS
            }
        }else{
            return {
                data:{},
                status:Status.FAIL
            }
        }
    }
}