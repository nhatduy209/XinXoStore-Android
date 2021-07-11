
import { Status } from '../../Config/dataStatus';
import { NAME_EPICS } from '../epics/AdressEpics/ActionName';
const adressState = {
  adress: {
    status: Status.FAIL,
    data: {
      adress:[],
      length:0
    },
  },
};

const AdressReducer = (state = adressState, action) => {
  switch (action.type) { 
    case NAME_EPICS.ADRESS_EPICS.GET_EPICS_SUCCESS:
      state = {
        ...state,
        adress: {
          status: Status.SUCCESS,
          data: action.data,
        }
      }
      break;
    case NAME_EPICS.ADRESS_EPICS.ADD_EPICS_SUCCESS:
      state = {
        ...state,
        adress: {
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
export default AdressReducer;
