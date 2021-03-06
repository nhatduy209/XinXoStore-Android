import { ofType } from 'redux-observable';
import { from, of } from 'rxjs';
import { mergeMap, filter, map, takeUntil, catchError } from 'rxjs/operators';
import { NAME_EPICS } from './ActionName'
import {NAME_ACTIONS}from '../../action/GetPublisherInfoAction/ActionName'
import PublisherInfoBusiness from '../../../bussiness/PublisherInfoBusiness';


let messageError = {};

const resolver = (action) => {
    const publisherInfoBusiness = new PublisherInfoBusiness();
    return new Promise((resolve, reject) => {
        switch (action.type) {
            case NAME_ACTIONS.PUBLISHER_ÌNFO_SCREEN.PUBLISHER_ÌNFO_SCREEN:
              publisherInfoBusiness.getPublisherInfo(action.data,success => {
                    resolve({
                        actionType: NAME_ACTIONS.PUBLISHER_ÌNFO_SCREEN.PUBLISHER_ÌNFO_SUCCESS,
                        data: success
                    });
                }, failed => {
                    messageError = failed;
                    reject(new Error(NAME_ACTIONS.PUBLISHER_ÌNFO_SCREEN.PUBLISHER_ÌNFO_FAIL));
                })
                break;
            default:
                console.error('Error when resolver Publisher Epic.');
                break;
        }
    });
};

const dispatch = (data) => {
    switch (data.actionType) {
        case NAME_ACTIONS.PUBLISHER_ÌNFO_SCREEN.PUBLISHER_ÌNFO_SUCCESS:
            return {
                type: NAME_EPICS.GET_PUBLISHER_INFO_EPICS.GET_PUBLISHER_INFO_EPICS_SUCCESS,
                data: data.data.data
            };
        default:
            console.error('Error when dispatch Publisher  Epic.');
            return new Error('Error when dispatch  Publisher  Epic.');
    }
};

const dispatchError = (error, action) => {
    switch (error.message) {
        case NAME_ACTIONS.PUBLISHER_ÌNFO_SCREEN.PUBLISHER_ÌNFO_FAIL:
            return {
                type: NAME_EPICS.GET_PUBLISHER_INFO_EPICS.GET_PUBLISHER_INFO_EPICS_FAIL,
                data: messageError
            }
        default:
            console.error('Error when dispatch error  new arrivals  Epic.');
            return new Error('Error when dispatch error  new arrivals  Epic.'); 
    }
};

const PublisherInfoEpic = (action$) =>
    action$.pipe(
        ofType(NAME_ACTIONS.PUBLISHER_ÌNFO_SCREEN.PUBLISHER_ÌNFO_SCREEN),
        mergeMap((action) =>
            from(resolver(action)).pipe(
                map((success) => dispatch(success)),
                catchError((error) => of(dispatchError(error, action))),
                takeUntil(action$.pipe(filter((pipeAction) => pipeAction.type === 'CANCEL')))
            )
        )
    );
export default PublisherInfoEpic;