import { NAME_ACTIONS } from './ActionName'
export const editProfile = ( data, key  ) => {
    return {
      type : NAME_ACTIONS.EDIT_PROFILE.EDIT_PROFILE_ACTIONS ,
      data : {key , data } ,
    }
}