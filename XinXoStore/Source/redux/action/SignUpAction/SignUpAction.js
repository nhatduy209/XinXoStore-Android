import {NAME_ACTIONS} from './ActionName';
export function SignUp(email, username, password, age){
    return{
        type:NAME_ACTIONS.SIGNUP_SCREEN.SIGNUP_SCREEN,
        data:{
            email:email,
            username:username,
            password:password,
            age:age
        }
    }
}

