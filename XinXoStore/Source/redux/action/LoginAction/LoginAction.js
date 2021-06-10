import { NAME_ACTIONS } from './ActionName';

export function Login(username , password){
  console.log(username,password);


  // CALL API FIREBASE HERE 



  return {
    type: NAME_ACTIONS.LOGIN_SCREEN.LOGIN_ACTION_SUCCESS,
    data: {
        username : username,
        password : password,  
    }
  } 
}