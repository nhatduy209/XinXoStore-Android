
import { NAME_ACTIONS } from './ActionName';
export function Login(username, password,token) {
  console.log(username, password,token);
    return {
      type: NAME_ACTIONS.LOGIN_SCREEN.LOGIN_SCREEN,
      data: {
        username: username,
        password: password,
        token:token,
      }
    }
}

export const editProfile = ( data, changePasswords = false  ) => {
  return {
      type : NAME_ACTIONS.LOGIN_SCREEN.EDIT_PROFILE_ACTIONS ,
      data : {data , changePasswords } ,
    }
}

export const Logout = (token,username) => {
  return {
    type : NAME_ACTIONS.LOGIN_SCREEN.LOGOUT_ACTIONS ,
    data : {
      token,username
    } ,
  }
}
export function LoginInWithGoogle(email, username, password, age,token){
  return{
      type:NAME_ACTIONS.LOGIN_SCREEN.LOGIN_GG_SCREEN,
      data:{
          email:email,
          username:username,
          password:password,
          age:age,
          token:token
      }
  }
}
