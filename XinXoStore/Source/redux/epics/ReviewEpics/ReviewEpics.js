import { ofType } from 'redux-observable';
import { from, of } from 'rxjs';
import { mergeMap, filter, map, takeUntil, catchError } from 'rxjs/operators';
import { NAME_EPICS } from './ActionName'
import {NAME_ACTIONS}from '../../action/ReviewAction/ActionName'
import ReviewsBussiness from '../../../bussiness/GetReviewsBussiness';


let messageError = {};

const resolver = (action) => {
    const reviewsBusiness = new ReviewsBussiness();
    return new Promise((resolve, reject) => {
        switch (action.type) {
            case NAME_ACTIONS.GET_REVIEWS_ITEMS.GET_REVIEWS_ITEMS_ACTION:
              reviewsBusiness.getListReviews(action.data , success => {
                    resolve({
                        actionType: NAME_ACTIONS.GET_REVIEWS_ITEMS.GET_REVIEWS_ITEMS_SUCCESS,
                        data: success
                    });
                }, failed => {
                    messageError = failed;
                    reject(new Error(NAME_ACTIONS.GET_REVIEWS_ITEMS.GET_REVIEWS_ITEMS_FAIL));
                })
                break;
            default:
                console.error('Error when resolver Reviews Epic.');
                break;
        }
    });
};

const dispatch = (data) => {
    switch (data.actionType) {
        case NAME_ACTIONS.GET_REVIEWS_ITEMS.GET_REVIEWS_ITEMS_SUCCESS:
            return {
                type: NAME_EPICS.GET_LIST_REVIEWS_EPICS.GET_LIST_REVIEWS_EPICS_SUCCESS,
                data: data.data.data
            };
        default:
            console.error('Error when dispatch reviews  Epic.');
            return new Error('Error when dispatch  reviews  Epic.');
    }
};

const dispatchError = (error, action) => {
    switch (error.message) {
        case NAME_ACTIONS.GET_REVIEWS_ITEMS.GET_REVIEWS_ITEMS_FAIL:
            return {
                type: NAME_EPICS.GET_LIST_REVIEWS_EPICS.GET_LIST_REVIEWS_EPICS_FAIL,
                data: messageError
            }
        default:
            console.error('Error when dispatch error  reviews  Epic.');
            return new Error('Error when dispatch error  reviews  Epic.'); 
    }
};

const ReviewsEpic = (action$) =>
    action$.pipe(
        ofType(NAME_ACTIONS.GET_REVIEWS_ITEMS.GET_REVIEWS_ITEMS_ACTION),
        mergeMap((action) =>
            from(resolver(action)).pipe(
                map((success) => dispatch(success)),
                catchError((error) => of(dispatchError(error, action))),
                takeUntil(action$.pipe(filter((pipeAction) => pipeAction.type === 'CANCEL')))
            )
        )
    );
export default ReviewsEpic;