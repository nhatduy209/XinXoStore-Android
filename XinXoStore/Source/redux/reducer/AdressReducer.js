
import { Status } from '../../Config/dataStatus';
import { NAME_EPICS } from '../epics/AdressEpics/ActionName';
const adressState = {
  adress: {
    status: Status.FAIL,
    data: {},
  },
};

const AdressReducer = (state = adressState, action) => {
  console.log('REDUCER ADD ADRESS -----' , action);
  switch (action.type) { 
    case NAME_EPICS.ADRESS_EPICS.GET_LIST_EPICS_ADRESS:
      state = {
        ...state,
        adress: {
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
export default AdressReducer;
