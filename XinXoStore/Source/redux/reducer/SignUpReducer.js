
import { Status } from '../../Config/dataStatus';
import { NAME_EPICS } from '../epics/SignUpEpics/ActionName';
const signUpState = {
  user: {
    status: Status.FAIL,
    data: {},
  },
};

const SignUpReducer = (state = signUpState, action) => {
  switch (action.type) {
    case NAME_EPICS.SIGNUP_EPICS_SCREEN.SIGNUP_EPICS_SUCCESS:
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
export default SignUpReducer;
