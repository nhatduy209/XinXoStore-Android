
import { Status } from '../../Config/dataStatus';
import { NAME_EPICS } from '../epics/DetailEpics/ActionName';
const arrivalItemState = {
  items: {
    status: Status.FAIL,
    data: {},
  },
};

const ArrivalItemReducer = (state = arrivalItemState, action) => {
  console.log('REDUCER -----', action.type);
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
    case NAME_EPICS.EDIT_PRODUCT_EPICS.EDIT_PRODUCT_SUCCESS:
      state = {
        ...state,
        user: {
          status: Status.SUCCESS,
          data: action.data,
        }
      }
      break;

    case NAME_EPICS.EDIT_PRODUCT_EPICS.EDIT_PRODUCT_FAIL:
      state = {
        ...state,
        user: {
          status: Status.FAIL,
        }
      }
      break;
    default:
      break;
  }
  return state;
};
export default ArrivalItemReducer;