
import { Status } from '../../Config/dataStatus';
import { NAME_EPICS } from '../epics/AddressEpics/ActionName';
const addressState = {
  address: {
    status: Status.FAIL,
    data: {
      
    },
  },
  default:{
    status: Status.FAIL,
    data: {
      
    },
  },
  add:{
    status:Status.FAIL
  },
  current:{
    data:{}
  }
};

const AddressReducer = (state = addressState, action) => {
  console.log("action",action.data);
  switch (action.type) { 
    case NAME_EPICS.ADDRESS_EPICS.GET_EPICS_SUCCESS:
      state = {
        ...state,
        address: {
          status: Status.SUCCESS,
          data: action.data
        }
      }
      break;
    case NAME_EPICS.ADDRESS_EPICS.ADD_EPICS_SUCCESS:
      state = {
        ...state,
        add: {
          status: Status.SUCCESS,
        }
      }
      break;
    case NAME_EPICS.CHECKOUT_EPICS_SCREEN.GET_DEFAULT_EPIC_SUCCESS:
      state = {
        ...state,
        default: {
          status: Status.SUCCESS,
          data: action.data
        }
      }
      break;
    default:
      break;
  }
  return state;
};
export default AddressReducer;
