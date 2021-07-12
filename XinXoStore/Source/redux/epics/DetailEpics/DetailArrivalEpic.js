import { ofType } from 'redux-observable';
import { from, of } from 'rxjs';
import { mergeMap, filter, map, takeUntil, catchError } from 'rxjs/operators';
import { NAME_EPICS } from './ActionName'
import {NAME_ACTIONS}from '../../action/GetItemArrivalAction/ActionName';
import DetailItemBussiness from '../../../bussiness/DetailItemBussiness';


let messageError = {};

const resolver = (action) => {
    const detailItemBusiness = new DetailItemBussiness();
    return new Promise((resolve, reject) => {
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
        default:
            console.error('Error when dispatch error arrival item Epic.');
            return new Error('Error when dispatch error arrival item  Epic.'); 
    }
};

const ArrivalItemEpic = (action$) =>
    action$.pipe(
        ofType(NAME_ACTIONS.GET_ARRIVAL_ITEM.GET_ARRIVAL_ITEM_ACTION),
        mergeMap((action) =>
            from(resolver(action)).pipe(
                map((success) => dispatch(success)),
                catchError((error) => of(dispatchError(error, action))),
                takeUntil(action$.pipe(filter((pipeAction) => pipeAction.type === 'CANCEL')))
            )
        )
    );
export default ArrivalItemEpic;