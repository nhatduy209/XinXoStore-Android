import { async } from "rxjs";
import { Status } from "../Config/dataStatus";
import ReadService from "../services/ReadData";
import PushService from "../services/PushData";
import RemoveService from "../services/RemoveData";
import UpdateService from "../services/UpdateData";

export default class BillBusiness{
    getAll=async(data,success,failed)=>{
        var readService= new ReadService();
        const result= await readService.getListIDBill(data.idAccount);
        if(result.status==Status.SUCCESS){
            const listItem= await readService.getListItemShoppingCart(result.data.listID);
            if(listItem.status==Status.SUCCESS){
                var final={
                    status:listItem.status,
                    data:{
                        listItem:listItem.data,
                        noNewReview:result.data.noNewReview
                    }
                }
                success(final);
            }else{
                success(result);
            }
            
        }
        else{
            failed(result);
        }
    }
    checkout=async(data,success,failed)=>{
        let pushService= new PushService();
        let removeService= new RemoveService();
        let updateService= new UpdateService();
        let result = await pushService.createBill(data);
        if(result.status==Status.SUCCESS){
            // REMOVE SHOPPING CART 
            let remove = await removeService.removeShoppingCart(data);
            // CHANGE STATUS OF ITEM
            let changeStatus= await updateService.updateStatusOfListProduct(data); 
            if(remove.status==Status.SUCCESS && changeStatus.status==Status.SUCCESS){
                success(result);
            }
            else{
                failed(result);
            }
        }
    }
}