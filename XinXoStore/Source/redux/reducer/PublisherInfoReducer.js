
import { Status } from '../../Config/dataStatus';
import { NAME_EPICS } from '../epics/PublserInfoEpics/ActionName';
const publisherState = {
  publisher: {
    status: Status.FAIL,
    data: {},
  },
};

const PublisherInfoReducer = (state = publisherState, action) => {
  switch (action.type) { 
    case NAME_EPICS.GET_PUBLISHER_INFO_EPICS.GET_PUBLISHER_INFO_EPICS_SUCCESS:
      state = {
        ...state,
        publisher: {
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
export default PublisherInfoReducer;
