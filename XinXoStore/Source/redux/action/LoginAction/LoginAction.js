
import { NAME_ACTIONS } from './ActionName';
export function Login(username, password) {
  console.log(username, password);
    return {
      type: NAME_ACTIONS.LOGIN_SCREEN.LOGIN_SCREEN,
      data: {
        username: username,
        password: password,
      }
    }
}

export const editProfile = ( data, changePasswords = false  ) => {
  console.log('THIS IS EDIT PROFILE --------- ', data )
    return {
      type : NAME_ACTIONS.LOGIN_SCREEN.EDIT_PROFILE_ACTIONS ,
      data : {data , changePasswords } ,
    }
}

export const Logout = () => {
  return {
    type : NAME_ACTIONS.LOGIN_SCREEN.LOGOUT_ACTIONS ,
    data : {} ,
  }
}