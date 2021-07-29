import { ofType } from 'redux-observable';
import { from, of } from 'rxjs';
import { mergeMap, filter, map, takeUntil, catchError } from 'rxjs/operators';
import { NAME_EPICS } from './ActionName'
import {NAME_ACTIONS}from '../../action/BillAction/ActionName'
import BillBusiness from '../../../bussiness/BillBusiness';


let messageError = {};

const resolver = (action) => {
    const billBusiness = new BillBusiness();
    return new Promise((resolve, reject) => {
        switch (action.type) {
            case NAME_ACTIONS.BILL_SCREEN.GET_ALL_SCREEN:
                billBusiness.getAll(action.data, success => {
                    resolve({
                        actionType: NAME_ACTIONS.BILL_SCREEN.GET_ALL_SUCCESS,
                        data: success
                    });
                }, failed => {
                    messageError = failed;
                    reject(new Error(NAME_ACTIONS.BILL_SCREEN.GET_ALL_FAIL));
                })
                break;
            case NAME_ACTIONS.CHECKOUT_SCREEN.CHECKOUT_SCREEN:
                billBusiness.checkout(action.data, success => {
                    resolve({
                        actionType: NAME_ACTIONS.CHECKOUT_SCREEN.CHECKOUT_SUCCESS,
                        data: success
                    });
                }, failed => {
                    messageError = failed;
                    reject(new Error(NAME_ACTIONS.CHECKOUT_SCREEN.CHECKOUT_FAIL));
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
        case NAME_ACTIONS.BILL_SCREEN.GET_ALL_SUCCESS:
            return {
                type: NAME_EPICS.BILL_SCREEN.GET_ALL_SUCCESS,
                data: data.data.data
            };
        case NAME_ACTIONS.CHECKOUT_SCREEN.CHECKOUT_SUCCESS:
            return {
                type: NAME_EPICS.CHECKOUT_SCREEN.CHECKOUT_SUCCESS,
                data: data.data.data
            };
        default:
            return new Error('Error when dispatch User Epic.');
    }
};

const dispatchError = (error, action) => {
    switch (error.message) {
        case NAME_ACTIONS.BILL_SCREEN.GET_ALL_FAIL:
            return {
                type: NAME_EPICS.BILL_SCREEN.GET_ALL_FAIL,
                data: messageError
            }
        case NAME_ACTIONS.CHECKOUT_SCREEN.CHECKOUT_FAIL:
            return {
                type: NAME_EPICS.CHECKOUT_SCREEN.CHECKOUT_FAIL,
                data: messageError
            }
        default:
            console.error('Error when dispatch error User Epic.');
            console.error(error.message);
            console.error(action);
            return new Error('Error when dispatch error User Epic.'); 
    }
};

const BillEpic = (action$) =>
    action$.pipe(
        ofType(NAME_ACTIONS.BILL_SCREEN.GET_ALL_SCREEN,NAME_ACTIONS.CHECKOUT_SCREEN.CHECKOUT_SCREEN),
        mergeMap((action) =>
            from(resolver(action)).pipe(
                map((success) => dispatch(success)),
                catchError((error) => of(dispatchError(error, action))),
                takeUntil(action$.pipe(filter((pipeAction) => pipeAction.type === 'CANCEL')))
            )
        )
    );
export default BillEpic;