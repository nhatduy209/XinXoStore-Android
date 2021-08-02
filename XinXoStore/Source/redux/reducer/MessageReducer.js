
import { Status } from '../../Config/dataStatus';
import { NAME_EPICS } from '../epics/MesssageEpics/ActionName';
const message = {
  list_message: {
    status: Status.FAIL,
    data: {},
  },

  sendMessage: {
    status: Status.FAIL,
    data: {},
  },
};

const MessageReducer = (state = message, action) => {
  switch (action.type) {
    case NAME_EPICS.GET_LIST_MESSAGE.GET_LIST_MESSAGE_SUCCESS:
      state = {
        ...state,
        list_message: {
          status: Status.SUCCESS,
          data: action.data,
        }
      }
      break;
    case NAME_EPICS.GET_LIST_MESSAGE.GET_LIST_MESSAGE_FAIL:
      state = {
        ...state,
        list_message: {
          status: Status.FAIL,
          data: {},
        }
      }
      break;
    case NAME_EPICS.GET_LIST_MESSAGE.GET_LIST_MESSAGE_SUCCESS:
      state = {
        ...state,
        sendMessage: {
          status: Status.SUCCESS,
          data:{},
        }
      }
      break;
    default:
      break;
  }
  return state;
};
export default MessageReducer;