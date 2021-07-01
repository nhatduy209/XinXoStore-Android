
import { Status } from '../../Config/dataStatus';
import { NAME_EPICS } from '../epics/NewArrivalsEpics/ActionName';
const newArrivalsState = {
  items: {
    status: Status.FAIL,
    data: {},
  },
};

const NewArrivalsReducer = (state = newArrivalsState, action) => {
  switch (action.type) {
    case NAME_EPICS.GET_LIST_NEW_ARRIVALS_EPICS.GET_LIST_NEW_ARRIVALS_EPICS_SUCCESS:
      state = {
        ...state,
        items: {
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
export default NewArrivalsReducer;
