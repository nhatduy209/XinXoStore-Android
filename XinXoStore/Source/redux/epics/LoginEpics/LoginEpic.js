import { ofType } from 'redux-observable';
import { from, of } from 'rxjs';
import { mergeMap, filter, map, takeUntil, catchError } from 'rxjs/operators';
import { NAME_EPICS } from './ActionName'
import { NAME_ACTIONS } from '../../action/LoginAction/ActionName'
import LoginBusiness from '../../../bussiness/LoginBusiness';
import EditProfileBusiness from '../../../bussiness/EditProfileBusiness';

let messageError = {};

const resolver = (action) => {
    const loginBusiness = new LoginBusiness();
    const editProfileBusiness = new EditProfileBusiness();
    return new Promise((resolve, reject) => {
        console.log('UserEPIC ----------------------------', action);
        switch (action.type) {
            case NAME_ACTIONS.LOGIN_SCREEN.LOGIN_SCREEN:
                loginBusiness.verifyLogin(action.data, success => {
                    resolve({
                        actionType: NAME_ACTIONS.LOGIN_SCREEN.LOGIN_ACTION_SUCCESS,
                        data: success
                    });
                }, failed => {
                    messageError = failed;
                    reject(new Error(NAME_ACTIONS.LOGIN_SCREEN.LOGIN_ACTION_FAIL));
                })
                break;
            case NAME_ACTIONS.LOGIN_SCREEN.EDIT_PROFILE_ACTIONS:
                editProfileBusiness.editProfile(action.data, success => {
                    resolve({
                        actionType: NAME_ACTIONS.LOGIN_SCREEN.EDIT_PROFILE_SUCCESS,
                        data: success
                    });
                }, failed => {
                    messageError = failed;
                    reject(new Error(NAME_ACTIONS.LOGIN_SCREEN.EDIT_PROFILE_FAIL));
                })
                break;
            case NAME_ACTIONS.LOGIN_SCREEN.LOGOUT_ACTIONS:
                resolve({
                    actionType: NAME_ACTIONS.LOGIN_SCREEN.LOGOUT_SUCCESS,
                    data: {}
                })
                break;
            case NAME_ACTIONS.LOGIN_SCREEN.LOGIN_GG_SCREEN:
                loginBusiness.loginWithGoogle(action.data, success => {
                    resolve({
                        actionType: NAME_ACTIONS.LOGIN_SCREEN.LOGIN_GG_ACTION_SUCCESS,
                        data: success
                    });
                }, failed => {
                    messageError = failed;
                    reject(new Error(NAME_ACTIONS.LOGIN_SCREEN.LOGIN_GG_ACTION_FAIL));
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
        case NAME_ACTIONS.LOGIN_SCREEN.LOGIN_ACTION_SUCCESS:
            return {
                type: NAME_EPICS.LOGIN_EPICS_SCREEN.LOGIN_EPICS_SUCCESS,
                data: data.data.data
            };
        case NAME_ACTIONS.LOGIN_SCREEN.EDIT_PROFILE_SUCCESS:
            return {
                type: NAME_EPICS.LOGIN_EPICS_SCREEN.EDIT_PROFILE_SUCCESS,
                data: data.data.data
            };
        case NAME_ACTIONS.LOGIN_SCREEN.LOGOUT_SUCCESS:
            return {
                type: NAME_EPICS.LOGIN_EPICS_SCREEN.LOGOUT_SUCCESS,
                data: {}
            };
        case NAME_ACTIONS.LOGIN_SCREEN.LOGIN_GG_ACTION_SUCCESS:
            return {
                type: NAME_EPICS.LOGIN_EPICS_SCREEN.LOGIN_GG_SUCCESS,
                data: data.data.data
            };
        default:
            console.error('Error when dispatch User Epic.');
            return new Error('Error when dispatch User Epic.');
    }
};

const dispatchError = (error, action) => {
    switch (error.message) {
        case NAME_ACTIONS.LOGIN_SCREEN.LOGIN_ACTION_FAIL:
            return {
                type: NAME_EPICS.LOGIN_EPICS_SCREEN.LOGIN_EPICS_FAIL,
                data: messageError
            }
        case NAME_ACTIONS.LOGIN_SCREEN.EDIT_PROFILE_FAIL:
            return {
                type: NAME_EPICS.LOGIN_EPICS_SCREEN.LOGIN_EPICS_FAIL,
                data: messageError
            }
        case NAME_ACTIONS.LOGIN_SCREEN.LOGIN_GG_ACTION_FAIL:
            return {
                type: NAME_EPICS.LOGIN_EPICS_SCREEN.LOGIN_GG_FAIL,
                data: messageError
            }
        default:
            console.error('Error when dispatch error User Epic.');
            return new Error('Error when dispatch error User Epic.');
    }
};

const LoginEpic = (action$) =>
    action$.pipe(
        ofType(NAME_ACTIONS.LOGIN_SCREEN.LOGIN_SCREEN, 
            NAME_ACTIONS.LOGIN_SCREEN.LOGIN_GG_SCREEN,
            NAME_ACTIONS.LOGIN_SCREEN.EDIT_PROFILE_ACTIONS, 
            NAME_ACTIONS.LOGIN_SCREEN.LOGOUT_ACTIONS),
        mergeMap((action) =>
            from(resolver(action)).pipe(
                map((success) => dispatch(success)),
                catchError((error) => of(dispatchError(error, action))),
                takeUntil(action$.pipe(filter((pipeAction) => pipeAction.type === 'CANCEL')))
            )
        )
    );
export default LoginEpic;