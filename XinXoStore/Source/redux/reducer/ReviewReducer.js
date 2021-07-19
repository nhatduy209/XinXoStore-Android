
import { Status } from '../../Config/dataStatus';
import { NAME_EPICS } from '../epics/ReviewEpics/ActionName';
const reviewsState = {
  items: {
    status: Status.FAIL,
    data: {},
  },
};

const ReviewReducer = (state = reviewsState, action) => {
  switch (action.type) {
    case NAME_EPICS.GET_LIST_REVIEWS_EPICS.GET_LIST_REVIEWS_EPICS_SUCCESS:
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
export default ReviewReducer;
