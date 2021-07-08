
import { NAME_ACTIONS } from './ActionName';
export function Login(username, password) {
  console.log(username, password);
  // CALL API FIREBASE HERE 
    return {
      type: NAME_ACTIONS.LOGIN_SCREEN.LOGIN_SCREEN,
      data: {
        username: username,
        password: password,
      }
    }
}

export const editProfile = ( data ) => {
  console.log('THIS IS EDIT PROFILE --------- ', data )
    return {
      type : NAME_ACTIONS.LOGIN_SCREEN.EDIT_PROFILE_ACTIONS ,
      data : {data } ,
    }
}