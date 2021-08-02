import { ofType } from 'redux-observable';
import { from, of } from 'rxjs';
import { mergeMap, filter, map, takeUntil, catchError } from 'rxjs/operators';
import { NAME_EPICS } from './ActionName'
import {NAME_ACTIONS}from '../../action/PushNotificationAction/ActionName'
import PushNotificationBusiness from '../../../bussiness/PushNotificationBusiness';


let messageError = {};

const resolver = (action) => {
    const pushNotificationBusiness  = new PushNotificationBusiness();
    return new Promise((resolve, reject) => {
        switch (action.type) {
            case NAME_ACTIONS.PUSH_NOTIFICATIONS_ACTION.PUSH_NOTIFICATIONS_ACTION:
                pushNotificationBusiness.PushNotificationBusiness(action.data , success => {
                    resolve({
                        actionType: NAME_ACTIONS.PUSH_NOTIFICATIONS_ACTION.PUSH_NOTIFICATIONS_ACTION_SUCCESS,
                        data: success
                    });
                }, failed => {
                    messageError = failed;
                    reject(new Error(NAME_ACTIONS.PUSH_NOTIFICATIONS_ACTION.PUSH_NOTIFICATIONS_ACTION_FAIL));
                })
                break;
            default:
                console.error('Error when resolver Push Notification  Epic.');
                break;
        }
    });
};

const dispatch = (data) => {
    switch (data.actionType) {
        case NAME_ACTIONS.PUSH_NOTIFICATIONS_ACTION.PUSH_NOTIFICATIONS_ACTION_SUCCESS:
            return {
                type: NAME_EPICS.PUSH_NOTIFICATIONS_EPICS.PUSH_NOTIFICATIONS_EPICS_SUCCESS,
                data: data.data.data
            };
        default:
            console.error('Error when dispatch  Push Notification  Epic.');
            return new Error('Error when dispatch   Push Notification  Epic.');
    }
};

const dispatchError = (error, action) => {
    switch (error.message) {
        case NAME_ACTIONS.PUSH_NOTIFICATIONS_ACTION.PUSH_NOTIFICATIONS_ACTION_FAIL:
            return {
                type: NAME_EPICS.PUSH_NOTIFICATIONS_EPICS.PUSH_NOTIFICATIONS_EPICS_FAIL,
                data: messageError
            }
        default:
            console.error('Error when dispatch error   Push Notification  Epic.');
            return new Error('Error when dispatch error   Push Notification  Epic.'); 
    }
};

const PushNotificationEpic = (action$) =>
    action$.pipe(
        ofType(NAME_ACTIONS.PUSH_NOTIFICATIONS_ACTION.PUSH_NOTIFICATIONS_ACTION),
        mergeMap((action) =>
            from(resolver(action)).pipe(
                map((success) => dispatch(success)),
                catchError((error) => of(dispatchError(error, action))),
                takeUntil(action$.pipe(filter((pipeAction) => pipeAction.type === 'CANCEL')))
            )
        )
    );
export default PushNotificationEpic;