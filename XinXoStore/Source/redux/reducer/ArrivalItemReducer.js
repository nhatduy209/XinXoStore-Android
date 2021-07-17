
import { Status } from '../../Config/dataStatus';
import { NAME_EPICS } from '../epics/DetailEpics/ActionName';
const arrivalItemState = {
  items: {
    status: Status.FAIL,
    data: {},
  },
};

const ArrivalItemReducer = (state = arrivalItemState, action) => {
  console.log('REDUCER -----', action);
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
        product: {
          status: Status.SUCCESS,
          data: action.data,
        }
      }
      break;

    case NAME_EPICS.EDIT_PRODUCT_EPICS.EDIT_PRODUCT_FAIL:
      state = {
        ...state,
        product: {
          status: Status.FAIL,
        }
      }
      break;
    case NAME_EPICS.ADD_PRODUCT_EPICS.ADD_PRODUCT_SUCCESS:
      state = {
        ...state,
        product: {
          status: Status.SUCCESS,
          data: action.data,
        }
      }
      break;

    case NAME_EPICS.ADD_PRODUCT_EPICS.ADD_PRODUCT_FAIL:
      state = {
        ...state,
        product: {
          status: Status.FAIL,
        }
      }
      break;
    case NAME_EPICS.DELETE_PRODUCT_EPICS.DELETE_PRODUCT_SUCCESS:
      state = {
        ...state,
        product: {
          status: Status.SUCCESS,
          data: action.data,
        }
      }
      break;

    case NAME_EPICS.DELETE_PRODUCT_EPICS.DELETE_PRODUCT_FAIL:
      state = {
        ...state,
        product: {
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