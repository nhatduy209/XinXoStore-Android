import { ofType } from 'redux-observable';
import { from, of } from 'rxjs';
import { mergeMap, filter, map, takeUntil, catchError } from 'rxjs/operators';
import { NAME_EPICS } from './ActionName'
import {NAME_ACTIONS}from '../../action/EditProfileAction/ActionName'
import LoginBusiness from '../../../bussiness/LoginBusiness';


let messageError = {};

const resolver = (action) => {
    const loginBusiness = new LoginBusiness();
    return new Promise((resolve, reject) => {
        console.log('LoginEPIC----------' , action);
        switch (action.type) {
            case NAME_ACTIONS.EDIT_PROFILE.EDIT_PROFILE_ACTIONS:
              loginBusiness.verifyLogin(action.data, success => {
                    resolve({
                        actionType: NAME_ACTIONS.EDIT_PROFILE.EDIT_PROFILE_SUCCESS,
                        data: success
                    });
                }, failed => {
                    messageError = failed;
                    reject(new Error(NAME_ACTIONS.EDIT_PROFILE.EDIT_PROFILE_FAIL));
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
        case NAME_ACTIONS.EDIT_PROFILE.EDIT_PROFILE_SUCCESS:
            return {
                type: NAME_EPICS.EDIT_PROFILE_SCREEN.EDIT_PROFILE_SUCCESS,
                data: data.data.data
            };
        default:
            console.error('Error when dispatch User Epic.');
            return new Error('Error when dispatch User Epic.');
    }
};

const dispatchError = (error, action) => {
    switch (error.message) {
        case NAME_ACTIONS.EDIT_PROFILE.EDIT_PROFILE_FAIL:
            return {
                type: NAME_EPICS.EDIT_PROFILE_SCREEN.EDIT_PROFILE_FAIL,
                data: messageError
            }
        default:
            console.error('Error when dispatch error User Epic.');
            return new Error('Error when dispatch error User Epic.'); 
    }
};

const EditProfileEpic = (action$) =>
    action$.pipe(
        ofType(NAME_ACTIONS.EDIT_PROFILE.EDIT_PROFILE_ACTIONS),
        mergeMap((action) =>
            from(resolver(action)).pipe(
                map((success) => dispatch(success)),
                catchError((error) => of(dispatchError(error, action))),
                takeUntil(action$.pipe(filter((pipeAction) => pipeAction.type === 'CANCEL')))
            )
        )
    );
export default EditProfileEpic;