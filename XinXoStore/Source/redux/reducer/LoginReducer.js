
import { Status } from '../../Config/dataStatus';
import { NAME_ACTIONS } from '../action/LoginAction/ActionName';
const loginState = {
  user: {
    status: Status.FAIL,
    message: '',
    data: {},
  },
};

const loginReducer = (state = loginState, action) => {
  switch (action.type) {
    case NAME_ACTIONS.LOGIN_SCREEN.LOGIN_ACTION_SUCCESS:
      console.log("OK");
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
          data: action.data,
        }
      }
      break;
  }
  return state;
};
export default loginReducer;
