import { ofType } from 'redux-observable';
import { from, of } from 'rxjs';
import { mergeMap, filter, map, takeUntil, catchError } from 'rxjs/operators';
import { NAME_EPICS } from './ActionName'
import {NAME_ACTIONS}from '../../action/Adress/ActionName'
import AdressBusiness from '../../../bussiness/AdressBusiness';


let messageError = {};

const resolver = (action) => {
    const adressBusiness = new AdressBusiness();
    return new Promise((resolve, reject) => {
        // console.log('ADRESS EPIC----------' , action);
        switch (action.type) {
            case NAME_ACTIONS.ADRESS_ACTIONS.GET_LIST_ADRESS:
                adressBusiness.getListAdress(action.data, success => {
                    resolve({
                        actionType: NAME_ACTIONS.ADRESS_ACTIONS.ADRESS_ACTION_SUCCESS,
                        data: success
                    });
                }, failed => {
                    messageError = failed;
                    reject(new Error(NAME_ACTIONS.ADRESS_ACTIONS.ADRESS_ACTION_FAIL));
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
        case NAME_ACTIONS.ADRESS_ACTIONS.ADRESS_ACTION_SUCCESS:
            return {
                type: NAME_EPICS.ADRESS_EPICS.ADRESS_EPICS_SUCCESS,
                data: data.data.data
            };
        default:
            console.error('Error when dispatch User Epic.');
            return new Error('Error when dispatch User Epic.');
    }
};

const dispatchError = (error, action) => {
    switch (error.message) {
        case NAME_ACTIONS.ADRESS_ACTIONS.ADRESS_ACTION_FAIL:
            return {
                type: NAME_EPICS.ADRESS_EPICS.ADRESS_EPICS_FAIL,
                data: messageError
            }
        default:
            // console.error('Error when dispatch error User Epic.');
            // console.error(error.message);
            // console.error(action);
            return new Error('Error when dispatch error User Epic.'); 
    }
};

const AdressEpic = (action$) =>
    action$.pipe(
        ofType(NAME_ACTIONS.ADRESS_ACTIONS.GET_LIST_ADRESS),
        mergeMap((action) =>
            from(resolver(action)).pipe(
                map((success) => dispatch(success)),
                catchError((error) => of(dispatchError(error, action))),
                takeUntil(action$.pipe(filter((pipeAction) => pipeAction.type === 'CANCEL')))
            )
        )
    );
export default AdressEpic;