
import { Status } from '../../Config/dataStatus';
import { NAME_EPICS } from '../epics/DetailEpics/ActionName';
const arrivalItemState = {
  items: {
    status: Status.FAIL,
    data: {},
  },
};

const ArrivalItemReducer = (state = arrivalItemState, action) => {
  switch (action.type) {
    case NAME_EPICS.GET_ARRIVAL_ITEM_EPICS.GET_ARRIVAL_ITEM_EPICS_SUCCESS:
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
export default ArrivalItemReducer;