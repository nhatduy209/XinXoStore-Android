
import { Status } from '../../Config/dataStatus';
import { NAME_EPICS } from '../epics/PushNotificationEpics/ActionName';
const pushNotificationState = {
  pushNotification: {
    status: Status.FAIL,
    data: {},
  },
};

const PushNotificationReducer = (state = pushNotificationState, action) => {
  switch (action.type) { 
    case NAME_EPICS.PUSH_NOTIFICATIONS_EPICS.PUSH_NOTIFICATIONS_EPICS_SUCCESS:
      state = {
        ...state,
        pushNotification: {
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
export default PushNotificationReducer;
