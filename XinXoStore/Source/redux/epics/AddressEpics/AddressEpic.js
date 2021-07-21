import { ofType } from 'redux-observable';
import { from, of } from 'rxjs';
import { mergeMap, filter, map, takeUntil, catchError } from 'rxjs/operators';
import { NAME_EPICS } from './ActionName'
import {NAME_ACTIONS}from '../../action/Address/ActionName'
import AddressBusiness from '../../../bussiness/AddressBusiness';


let messageError = {};

const resolver = (action) => {
    const addressBusiness = new AddressBusiness();
    return new Promise((resolve, reject) => {
        switch (action.type) {
            case NAME_ACTIONS.ADDRESS_ACTIONS.GET_ACTION_SCREEN:
                addressBusiness.getListAddress(action.data, success => {
                    resolve({
                        actionType: NAME_ACTIONS.ADDRESS_ACTIONS.GET_ACTION_SUCCESS,
                        data: success
                    });
                }, failed => {
                    messageError = failed;
                    reject(new Error(NAME_ACTIONS.ADDRESS_ACTIONS.GET_ACTION_FAIL));
                })
                break;
             case NAME_ACTIONS.ADDRESS_ACTIONS.ADD_ACTION_SCREEN:
                addressBusiness.addAddress(action.data, success => {
                    resolve({
                        actionType: NAME_ACTIONS.ADDRESS_ACTIONS.ADD_ACTION_SUCCESS,
                        data: success
                    });
                }, failed => {
                    messageError = failed;
                    reject(new Error(NAME_ACTIONS.ADDRESS_ACTIONS.ADD_ACTION_FAIL));
                })
                break;
            case NAME_ACTIONS.CHECKOUT_SCREEN.GET_DEFAULT_SCREEN:
                addressBusiness.getDefaultAddress(action.data, success => {
                    resolve({
                        actionType: NAME_ACTIONS.CHECKOUT_SCREEN.GET_DEFAULT_SUCCESS,
                        data: success
                    });
                }, failed => {
                    messageError = failed;
                    reject(new Error(NAME_ACTIONS.CHECKOUT_SCREEN.GET_DEFAULT_FAIL));
                })
                break;
            case NAME_ACTIONS.CHECKOUT_SCREEN.GET_DEFAULT_SCREEN:
                addressBusiness.getDefaultAddress(action.data, success => {
                    resolve({
                        actionType: NAME_ACTIONS.CHECKOUT_SCREEN.GET_DEFAULT_SUCCESS,
                        data: success
                    });
                }, failed => {
                    messageError = failed;
                    reject(new Error(NAME_ACTIONS.CHECKOUT_SCREEN.GET_DEFAULT_FAIL));
                })
                break;
            default:
                console.error('Error when resolver User Epic.');
                break;
        }
    });
};

const dispatch = (data) => {
    switch (data.actionType) {
        case NAME_ACTIONS.ADDRESS_ACTIONS.GET_ACTION_SUCCESS:
            console.log("data.data.data.address",data.data.data.address)
            return {
                type: NAME_EPICS.ADDRESS_EPICS.GET_EPICS_SUCCESS,
                data: data.data.data.address
            };
        case NAME_ACTIONS.ADDRESS_ACTIONS.ADD_ACTION_SUCCESS:
            return {
                type: NAME_EPICS.ADDRESS_EPICS.ADD_EPICS_SUCCESS,
                data: data.data.data
            };
        case NAME_ACTIONS.CHECKOUT_SCREEN.GET_DEFAULT_SUCCESS:
            return {
                type: NAME_EPICS.CHECKOUT_EPICS_SCREEN.GET_DEFAULT_EPIC_SUCCESS,
                data: data.data.data.address
            };
        default:
            console.error('Error when dispatch User Epic.');
            return new Error('Error when dispatch User Epic.');
    }
};

const dispatchError = (error, action) => {
    switch (error.message) {
        case NAME_ACTIONS.ADDRESS_ACTIONS.GET_ACTION_FAIL:
            return {
                type: NAME_EPICS.ADDRESS_EPICS.GET_EPICS_FAIL,
                data: messageError
            }
        case NAME_ACTIONS.ADDRESS_ACTIONS.ADD_ACTION_FAIL:
            return {
                type: NAME_EPICS.ADDRESS_EPICS.ADD_EPICS_FAIL,
                data: messageError
            }
        case NAME_ACTIONS.CHECKOUT_SCREEN.GET_DEFAULT_FAIL:
            return {
                type: NAME_EPICS.CHECKOUT_EPICS_SCREEN.GET_DEFAULT_EPIC_FAIL,
                data: messageError
            }
        default:
            console.error('Error when dispatch error User Epic.');
            console.error(error.message);
            console.error(action);
            return new Error('Error when dispatch error User Epic.'); 
    }
};

const AddressEpic = (action$) =>
    action$.pipe(
        ofType(NAME_ACTIONS.ADDRESS_ACTIONS.GET_ACTION_SCREEN,
            NAME_ACTIONS.ADDRESS_ACTIONS.ADD_ACTION_SCREEN,
            NAME_ACTIONS.CHECKOUT_SCREEN.GET_DEFAULT_SCREEN),
        mergeMap((action) =>
            from(resolver(action)).pipe(
                map((success) => dispatch(success)),
                catchError((error) => of(dispatchError(error, action))),
                takeUntil(action$.pipe(filter((pipeAction) => pipeAction.type === 'CANCEL')))
            )
        )
    );
export default AddressEpic;