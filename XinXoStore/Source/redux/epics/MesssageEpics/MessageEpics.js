import { ofType } from 'redux-observable';
import { from, of } from 'rxjs';
import { mergeMap, filter, map, takeUntil, catchError } from 'rxjs/operators';
import { NAME_EPICS } from './ActionName'
import { NAME_ACTIONS } from '../../action/MessageAction/ActionName'
import MessageBusiness from '../../../bussiness/MessageBusiness'

let messageError = {};

const resolver = (action) => {
    const messageBusiness = new MessageBusiness();
    return new Promise((resolve, reject) => {
        switch (action.type) {
            case NAME_ACTIONS.MESSAGE_ACTION.GET_LIST_MESSAGE_ACTION:
                messageBusiness.getListMessage(success => {
                    resolve({
                        actionType: NAME_ACTIONS.MESSAGE_ACTION.GET_LIST_MESSAGE_SUCCESS,
                        data: success
                    });
                }, failed => {
                    messageError = failed;
                    reject(new Error(NAME_ACTIONS.MESSAGE_ACTION.GET_LIST_MESSAGE_FAIL));
                })
                break;
            case NAME_ACTIONS.MESSAGE_ACTION.SEND_MESSAGE_ACTION:
                messageBusiness.sendMessage(action.data, success => {
                    resolve({
                        actionType: NAME_ACTIONS.MESSAGE_ACTION.SEND_MESSAGE_SUCCESS,
                        data: success
                    });
                }, failed => {
                    messageError = failed;
                    reject(new Error(NAME_ACTIONS.MESSAGE_ACTION.SEND_MESSAGE_FAIL));
                })
                break;

            case NAME_ACTIONS.MESSAGE_ACTION.GET_BUBBLE_MESSAGE:
                messageBusiness.getBubbleMessage(action.data, success => {
                    resolve({
                        actionType: NAME_ACTIONS.MESSAGE_ACTION.GET_BUBBLE_MESSAGE_SUCCESS,
                        data: success
                    });
                }, failed => {
                    messageError = failed;
                    reject(new Error(NAME_ACTIONS.MESSAGE_ACTION.GET_BUBBLE_MESSAGE_FAIL));
                })
                break;
            default:
                console.error('Error when resolver message Epic.');
                break;
        }
    });
};

const dispatch = (data) => {
    switch (data.actionType) {
        case NAME_ACTIONS.MESSAGE_ACTION.GET_LIST_MESSAGE_SUCCESS:
            return {
                type: NAME_EPICS.GET_LIST_MESSAGE.GET_LIST_MESSAGE_SUCCESS,
                data: data.data.data
            };
        case NAME_ACTIONS.MESSAGE_ACTION.SEND_MESSAGE_SUCCESS:
            return {
                type: NAME_EPICS.GET_LIST_MESSAGE.SEND_MESSAGE_SUCCESS,
                data: data.data.data
            };
        case NAME_ACTIONS.MESSAGE_ACTION.GET_BUBBLE_MESSAGE_SUCCESS:
            return {
                type: NAME_EPICS.GET_LIST_MESSAGE.GET_BUBBLE_MESSAGE_SUCCESS,
                data: data.data.data
            };
        default:
            console.error('Error when dispatch message   Epic.');
            return new Error('Error when dispatch   message  Epic.');
    }
};

const dispatchError = (error, action) => {
    switch (error.message) {
        case NAME_ACTIONS.MESSAGE_ACTION.SEND_MESSAGE_FAIL:
            return {
                type: NAME_EPICS.GET_LIST_MESSAGE.SEND_MESSAGE_FAIL,
                data: messageError
            }
        case NAME_ACTIONS.MESSAGE_ACTION.GET_BUBBLE_MESSAGE_FAIL:
            return {
                type: NAME_EPICS.GET_LIST_MESSAGE.GET_BUBBLE_MESSAGE_FAIL,
                data: messageError
            }
        default:
            console.error('Error when dispatch error   message  Epic.');
            return new Error('Error when dispatch error  message Epic.');
    }
};

const MessageEpic = (action$) =>
    action$.pipe(
        ofType(NAME_ACTIONS.MESSAGE_ACTION.GET_LIST_MESSAGE_ACTION, NAME_ACTIONS.MESSAGE_ACTION.SEND_MESSAGE_ACTION,
            NAME_ACTIONS.MESSAGE_ACTION.GET_BUBBLE_MESSAGE),
        mergeMap((action) =>
            from(resolver(action)).pipe(
                map((success) => dispatch(success)),
                catchError((error) => of(dispatchError(error, action))),
                takeUntil(action$.pipe(filter((pipeAction) => pipeAction.type === 'CANCEL')))
            )
        )
    );
export default MessageEpic;