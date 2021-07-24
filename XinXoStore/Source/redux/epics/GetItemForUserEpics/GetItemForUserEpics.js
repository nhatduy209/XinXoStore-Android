import { ofType } from 'redux-observable';
import { from, of } from 'rxjs';
import { mergeMap, filter, map, takeUntil, catchError } from 'rxjs/operators';
import { NAME_EPICS } from './ActionName'
import {NAME_ACTIONS}from '../../action/GetItemsForUser/ActionName'
import NewArrivalsBussiness from '../../../bussiness/NewArrivalsBussiness';
import GetItemsForUserBusiness from '../../../bussiness/GetItemForUserBusiness';


let messageError = {};

const resolver = (action) => {
    const getItemsForUserBusiness = new GetItemsForUserBusiness();
    return new Promise((resolve, reject) => {
        switch (action.type) {
            case NAME_ACTIONS.GET_ITEM_FOR_USER.GET_ITEM_FOR_USER_ACTIONS:
              getItemsForUserBusiness.getItemForUser(action.data , success => {
                    resolve({
                        actionType: NAME_ACTIONS.GET_ITEM_FOR_USER.GET_ITEM_FOR_USER_SUCCESS,
                        data: success
                    });
                }, failed => {
                    messageError = failed;
                    reject(new Error(NAME_ACTIONS.GET_ITEM_FOR_USER.GET_ITEM_FOR_USER_FAIL));
                })
                break;
            default:
                console.error('Error when resolver item user Epic.');
                break;
        }
    });
};

const dispatch = (data) => {
    switch (data.actionType) {
        case NAME_ACTIONS.GET_ITEM_FOR_USER.GET_ITEM_FOR_USER_SUCCESS:
            return {
                type: NAME_EPICS.GET_ITEMS_FOR_USER_EPICS.GET_ITEMS_FOR_USER_EPICS_SUCCESS,
                data: data.data.data
            };
        default:
            console.error('Error when dispatch item user   Epic.');
            return new Error('Error when dispatch   item user  Epic.');
    }
};

const dispatchError = (error, action) => {
    switch (error.message) {
        case NAME_ACTIONS.GET_ITEM_FOR_USER.GET_ITEM_FOR_USER_FAIL:
            return {
                type: NAME_EPICS.GET_ITEMS_FOR_USER_EPICS.GET_ITEMS_FOR_USER_EPICS_FAIL,
                data: messageError
            }
        default:
            console.error('Error when dispatch error   item user  Epic.');
            return new Error('Error when dispatch error  item user Epic.'); 
    }
};

const GetItemForUserEpic = (action$) =>
    action$.pipe(
        ofType(NAME_ACTIONS.GET_ITEM_FOR_USER.GET_ITEM_FOR_USER_ACTIONS),
        mergeMap((action) =>
            from(resolver(action)).pipe(
                map((success) => dispatch(success)),
                catchError((error) => of(dispatchError(error, action))),
                takeUntil(action$.pipe(filter((pipeAction) => pipeAction.type === 'CANCEL')))
            )
        )
    );
export default GetItemForUserEpic;