
import { Status } from '../../Config/dataStatus';
import { NAME_EPICS } from '../epics/LoginEpics/ActionName';
const loginState = {
  user: {
    status: Status.FAIL,
    data: {},
  },
};

const LoginReducer = (state = loginState, action) => {
  console.log('REDUCER -----', action.type);
  switch (action.type) {
    case NAME_EPICS.LOGIN_EPICS_SCREEN.LOGIN_EPICS_SUCCESS:
      state = {
        ...state,
        user: {
          status: Status.SUCCESS,
          data: action.data,
        }
      }
      break;
    case NAME_EPICS.LOGIN_EPICS_SCREEN.EDIT_PROFILE_SUCCESS:
      state = {
        ...state,
        user: {
          status: Status.SUCCESS,
          data: action.data,
        }
      }
      break;

    case NAME_EPICS.LOGIN_EPICS_SCREEN.EDIT_PROFILE_FAIL:
      state = {
        ...state,
        user: {
          status: Status.FAIL,
        }
      }
      break;
    case NAME_EPICS.LOGIN_EPICS_SCREEN.LOGOUT_SUCCESS:
      state = {
        ...state,
        user: {
          status: Status.FAIL,
          data: {},
        }
      }
      break;
    case NAME_EPICS.LOGIN_EPICS_SCREEN.LOGIN_GG_SUCCESS:
      state = {
        ...state,
        user: {
          status: Status.SUCCESS,
          data: action.data,
        }
      }
      break;
    default:
      break;
  }
  return state;
};
export default LoginReducer;
