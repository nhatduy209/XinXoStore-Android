import { async } from "rxjs";
import { Status } from "../Config/dataStatus";
import ReadService from "../services/ReadData";

export default class BillBusiness{
    getAll=async(data,success,failed)=>{
        var readService= new ReadService();
        const result= await readService.getListIDBill(data.idAccount);
        console.log("result",result);
        if(result.status==Status.SUCCESS){
            console.log("result",result);
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
}