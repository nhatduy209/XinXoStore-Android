
import { Status } from '../../Config/dataStatus';
import { NAME_ACTIONS } from '../action/LoginAction/ActionName';
import { NAME_EPICS } from '../epics /LoginEpics/ActionName';
const loginState = {
  user: {
    status: Status.FAIL,
    data: {},
  },
};

const LoginReducer = (state = loginState, action) => {
  console.log('REDUCER -----' , action);
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
    default:
      state = {
        ...state,
        user: {
          status:  Status.FAIL,
          data: {},
        }
      }
      break;
  }
  return state;
};
export default LoginReducer;
