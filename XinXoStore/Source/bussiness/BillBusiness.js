import { async } from "rxjs";
import { Status } from "../Config/dataStatus";
import ReadService from "../services/ReadData";

export default class BillBusiness{
    getAll=async(data,success,failed)=>{
        var readService= new ReadService();
        const result= await readService.getListIDBill(data.idAccount);
        if(result.status==Status.SUCCESS){
            const listItem= await readService.getListItemShoppingCart(result.data);
            if(listItem.status==Status.SUCCESS){
                success(listItem);
            }else{
                success(result);
            }
            
        }
        else{
            failed(result);
        }
    }
}