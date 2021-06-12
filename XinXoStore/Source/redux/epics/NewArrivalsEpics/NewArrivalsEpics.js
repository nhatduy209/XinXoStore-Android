import { ofType } from 'redux-observable';
import { from, of } from 'rxjs';
import { mergeMap, filter, map, takeUntil, catchError } from 'rxjs/operators';
import { NAME_EPICS } from './ActionName'
import {NAME_ACTIONS}from '../../action/GetNewArrivalsAction/ActionName'
import NewArrivalsBussiness from '../../../bussiness/NewArrivalsBussiness';


let messageError = {};

const resolver = (action) => {
    const newArrivalsBusiness = new NewArrivalsBussiness();
    return new Promise((resolve, reject) => {
        console.log('NEW ARRIVALS EPIC----------' , action);
        switch (action.type) {
            case NAME_ACTIONS.GET_NEW_ARRIVALS_ITEMS.GET_NEW_ARRIVALS_ITEMS_ACTION:
              newArrivalsBusiness.getListNewArrivals(success => {
                    resolve({
                        actionType: NAME_ACTIONS.GET_NEW_ARRIVALS_ITEMS.GET_NEW_ARRIVALS_ITEMS_SUCCESS,
                        data: success
                    });
                }, failed => {
                    messageError = failed;
                    reject(new Error(NAME_ACTIONS.GET_NEW_ARRIVALS_ITEMS.GET_NEW_ARRIVALS_ITEMS_FAIL));
                })
                break;
            default:
                console.error('Error when resolver NewArrivals Epic.');
                break;
        }
    });
};

const dispatch = (data) => {
    switch (data.actionType) {
        case NAME_ACTIONS.GET_NEW_ARRIVALS_ITEMS.GET_NEW_ARRIVALS_ITEMS_SUCCESS:
            return {
                type: NAME_EPICS.GET_LIST_NEW_ARRIVALS_EPICS.GET_LIST_NEW_ARRIVALS_EPICS_SUCCESS,
                data: data.data.data
            };
        default:
            console.error('Error when dispatch new arrivals  Epic.');
            return new Error('Error when dispatch  new arrivals  Epic.');
    }
};

const dispatchError = (error, action) => {
    switch (error.message) {
        case NAME_ACTIONS.GET_NEW_ARRIVALS_ITEMS.GET_NEW_ARRIVALS_ITEMS_FAIL:
            return {
                type: NAME_EPICS.GET_LIST_NEW_ARRIVALS_EPICS.GET_LIST_NEW_ARRIVALS_EPICS_FAIL,
                data: messageError
            }
        default:
            console.error('Error when dispatch error  new arrivals  Epic.');
            return new Error('Error when dispatch error  new arrivals  Epic.'); 
    }
};

const NewArrivalsEpic = (action$) =>
    action$.pipe(
        ofType(NAME_ACTIONS.GET_NEW_ARRIVALS_ITEMS.GET_NEW_ARRIVALS_ITEMS_ACTION),
        mergeMap((action) =>
            from(resolver(action)).pipe(
                map((success) => dispatch(success)),
                catchError((error) => of(dispatchError(error, action))),
                takeUntil(action$.pipe(filter((pipeAction) => pipeAction.type === 'CANCEL')))
            )
        )
    );
export default NewArrivalsEpic;