
import { Status } from '../../Config/dataStatus';
import { NAME_EPICS } from '../epics/GetItemForUserEpics/ActionName';
const itemUser = {
  items: {
    status: Status.FAIL,
    data: {},
  },
};

const ItemsUserReducer = (state = itemUser, action) => {
  switch (action.type) {
    case NAME_EPICS.GET_ITEMS_FOR_USER_EPICS.GET_ITEMS_FOR_USER_EPICS_SUCCESS:
      state = {
        ...state,
        items: {
          status: Status.SUCCESS,
          data: action.data,
        }
      }
      break;
    case NAME_EPICS.GET_ITEMS_FOR_USER_EPICS.GET_ITEMS_FOR_USER_EPICS_FAIL:
      state = {
        ...state,
        items: {
          status: Status.FAIL,
          data : {},
        }
      }
      break;
    default:
      break;
  }
  return state;
};
export default ItemsUserReducer;