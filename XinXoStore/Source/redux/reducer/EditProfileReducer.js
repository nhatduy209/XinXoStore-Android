
import { Status } from '../../Config/dataStatus';
import { NAME_EPICS } from '../epics/EditProfileEpics/ActionName';
const newArrivalsState = {
  items: {
    status: Status.FAIL,
    data: {},
  },
};

const EditProfileReducer = (state = newArrivalsState, action) => {
  switch (action.type) {
    case NAME_EPICS.EDIT_PROFILE_SCREEN.EDIT_PROFILE_SUCCESS:
      state = {
        ...state,
        items: {
          status: Status.SUCCESS,
          data: {},
        }
      }
      break;
    default:
      break;
  }
  return state;
};
export default EditProfileReducer;
