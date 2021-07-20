import { ofType } from 'redux-observable';
import { from, of } from 'rxjs';
import { mergeMap, filter, map, takeUntil, catchError } from 'rxjs/operators';
import { NAME_EPICS } from './ActionName'
import {NAME_ACTIONS}from '../../action/GetItemArrivalAction/ActionName';
import DetailItemBussiness from '../../../bussiness/DetailItemBussiness';
import EditProductBusiness from '../../../bussiness/EditProductBussiness';
import AddProductBusiness from '../../../bussiness/AddProductBussiness';
import DeleteProductBusiness from '../../../bussiness/DeleteProductBussiness';
let messageError = {};

const resolver = (action) => {
    const detailItemBusiness = new DetailItemBussiness();
    const editProductBusiness = new EditProductBusiness();
    const addProductBusiness = new AddProductBusiness();
    const deleteProductBusiness = new DeleteProductBusiness();
    return new Promise((resolve, reject) => {
        // console.log('UserEPIC----------', action);
        switch (action.type) {
            case NAME_ACTIONS.GET_ARRIVAL_ITEM.GET_ARRIVAL_ITEM_ACTION:
              detailItemBusiness.getArrivalItem(success => {
                    resolve({
                        actionType: NAME_ACTIONS.GET_ARRIVAL_ITEM.GET_ARRIVAL_ITEM_SUCCESS,
                        data: success
                    });
                }, failed => {
                    messageError = failed;
                    reject(new Error(NAME_ACTIONS.GET_ARRIVAL_ITEM.GET_ARRIVAL_ITEM_FAIL));
                })
                break;
            case NAME_ACTIONS.EDIT_PRODUCT.EDIT_PRODUCT_ACTIONS:
                editProductBusiness.editProduct(action.data, success => {
                    resolve({
                        actionType: NAME_ACTIONS.EDIT_PRODUCT.EDIT_PRODUCT_SUCCESS,
                        data: success
                    });
                }, failed => {
                    messageError = failed;
                    reject(new Error(NAME_ACTIONS.EDIT_PRODUCT.EDIT_PRODUCT_FAIL));
                })
                break;
            case NAME_ACTIONS.ADD_PRODUCT.ADD_PRODUCT_ACTIONS:
                addProductBusiness.addProduct(action.data, success => {
                    resolve({
                        actionType: NAME_ACTIONS.ADD_PRODUCT.ADD_PRODUCT_SUCCESS,
                        data: success
                    });
                }, failed => {
                    messageError = failed;
                    reject(new Error(NAME_ACTIONS.ADD_PRODUCT.ADD_PRODUCT_FAIL));
                })
                break;
            case NAME_ACTIONS.DELETE_PRODUCT.DELETE_PRODUCT_ACTIONS:
                deleteProductBusiness.deleteProduct(action.data, success => {
                    resolve({
                        actionType: NAME_ACTIONS.DELETE_PRODUCT.DELETE_PRODUCT_SUCCESS,
                        data: success
                    });
                }, failed => {
                    messageError = failed;
                    reject(new Error(NAME_ACTIONS.DELETE_PRODUCT.DELETE_PRODUCT_FAIL));
                })
                break;
            default:
                console.error('Error when resolver Arrival Item Epic.');
                break;
        }
    });
};

const dispatch = (data) => {
    switch (data.actionType) {
        case NAME_ACTIONS.GET_ARRIVAL_ITEM.GET_ARRIVAL_ITEM_SUCCESS:
            return {
                type: NAME_EPICS.GET_ARRIVAL_ITEM_EPICS.GET_ARRIVAL_ITEM_EPICS_SUCCESS,
                data: data.data.data
            };
        case NAME_ACTIONS.EDIT_PRODUCT.EDIT_PRODUCT_SUCCESS:
            return {
                type: NAME_EPICS.EDIT_PRODUCT_EPICS.EDIT_PRODUCT_SUCCESS,
                data: data.data.data
            };
        case NAME_ACTIONS.ADD_PRODUCT.ADD_PRODUCT_SUCCESS:
            return {
                type: NAME_EPICS.ADD_PRODUCT_EPICS.ADD_PRODUCT_SUCCESS,
                data: data.data.data
            };
        case NAME_ACTIONS.DELETE_PRODUCT.DELETE_PRODUCT_SUCCESS:
            return {
                type: NAME_EPICS.DELETE_PRODUCT_EPICS.DELETE_PRODUCT_SUCCESS,
                data: data.data.data
            };
        default:
            console.error('Error when dispatch arrival item  Epic.');
            return new Error('Error when dispatch  arrival item  Epic.');
    }
};

const dispatchError = (error, action) => {
    switch (error.message) {
        case NAME_ACTIONS.GET_ARRIVAL_ITEM.GET_ARRIVAL_ITEM_FAIL:
            return {
                type: NAME_EPICS.GET_ARRIVAL_ITEM_EPICS.GET_ARRIVAL_ITEM_EPICS_FAIL,
                data: messageError
            }
        case NAME_ACTIONS.EDIT_PRODUCT.EDIT_PRODUCT_FAIL:
            return {
                type: NAME_EPICS.EDIT_PRODUCT_EPICS.EDIT_PRODUCT_FAIL,
                data: messageError
            }
        case NAME_ACTIONS.ADD_PRODUCT.ADD_PRODUCT_FAIL:
            return {
                type: NAME_EPICS.ADD_PRODUCT_EPICS.ADD_PRODUCT_FAIL,
                data: messageError
            }
        case NAME_ACTIONS.DELETE_PRODUCT.DELETE_PRODUCT_FAIL:
            return {
                type: NAME_EPICS.DELETE_PRODUCT_EPICS.DELETE_PRODUCT_FAIL,
                data: messageError
            }
        default:
            console.error('Error when dispatch error arrival item Epic.');
            return new Error('Error when dispatch error arrival item  Epic.'); 
    }
};

const ArrivalItemEpic = (action$) =>
    action$.pipe(
        ofType(NAME_ACTIONS.GET_ARRIVAL_ITEM.GET_ARRIVAL_ITEM_ACTION,
            NAME_ACTIONS.EDIT_PRODUCT.EDIT_PRODUCT_ACTIONS,
            NAME_ACTIONS.ADD_PRODUCT.ADD_PRODUCT_ACTIONS,
            NAME_ACTIONS.DELETE_PRODUCT.DELETE_PRODUCT_ACTIONS),

        mergeMap((action) =>
            from(resolver(action)).pipe(
                map((success) => dispatch(success)),
                catchError((error) => of(dispatchError(error, action))),
                takeUntil(action$.pipe(filter((pipeAction) => pipeAction.type === 'CANCEL')))
            )
        )
    );
export default ArrivalItemEpic;