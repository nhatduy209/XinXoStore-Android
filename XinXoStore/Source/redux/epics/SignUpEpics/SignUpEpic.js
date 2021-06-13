import {ofType} from 'redux-observable';
import {from, of} from 'rxjs';
import {mergeMap, filter, map, takeUntil, catchError} from 'rxjs/operators';
import {NAME_EPICS} from './ActionName';
import {NAME_ACTIONS} from '../../action/SignUpAction/ActionName';
import SignUpBusiness from '../../../bussiness/SignUpBusiness';

let messageError={};

const resolver=(action)=>{
    const signUpBusiness = new SignUpBusiness();
    return new Promise((resolve,reject)=>{
        console.log('SIGNUP EPIC -----',action.type,NAME_ACTIONS.SIGNUP_SCREEN.SIGNUP_SCREEN);
        switch(action.type){
            case NAME_ACTIONS.SIGNUP_SCREEN.SIGNUP_SCREEN:
                signUpBusiness.signUp(action.data,success=>{
                    resolve({
                        actionType:NAME_ACTIONS.SIGNUP_SCREEN.SIGNUP_ACTION_SUCCESS,
                        data:success
                    },failed=>{
                        messageError=failed;
                        reject(new Error(NAME_ACTIONS.SIGNUP_SCREEN.SIGNUP_ACTION_FAIL));
                    })
                })
                break;
            default:
                console.error('ERROR when resolver user epic');
                break;
        }
    })
}
const dispatch = (data) => {
    switch (data.actionType) {
        case NAME_ACTIONS.SIGNUP_SCREEN.SIGNUP_ACTION_SUCCESS:
            return {    
                type: NAME_EPICS.SIGNUP_EPICS_SCREEN.SIGNUP_EPICS_SUCCESS,
                data: data.data.data
            };
        default:
            console.error('Error when dispatch User Epic.');
            return new Error('Error when dispatch User Epic.');
    }
};

const dispatchError = (error, action) => {
    switch (error.message) {
        case NAME_ACTIONS.SIGNUP_SCREEN.SIGNUP_ACTION_FAIL:
            return {
                type: NAME_EPICS.SIGNUP_EPICS_SCREEN.SIGNUP_EPICS_FAIL,
                data: messageError
            }
        default:
            console.error('Error when dispatch error User Epic.',error);
            return new Error('Error when dispatch error User Epic.'); 
    }
};
const SignUpEpic = (action$) =>
    action$.pipe(
        ofType(NAME_ACTIONS.SIGNUP_SCREEN.SIGNUP_SCREEN),
        mergeMap((action) =>
            from(resolver(action)).pipe(
                map((success) => dispatch(success)),
                catchError((error) => of(dispatchError(error, action))),
                takeUntil(action$.pipe(filter((pipeAction) => pipeAction.type === 'CANCEL')))
            )
        )
    );
export default SignUpEpic;