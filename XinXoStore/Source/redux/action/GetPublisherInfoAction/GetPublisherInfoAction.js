
import { NAME_ACTIONS } from './ActionName';
export function getPublisherInfo(ownerId) {
  return {
      type: NAME_ACTIONS.PUBLISHER_ÌNFO_SCREEN.PUBLISHER_ÌNFO_SCREEN,
      data: {
        ownerId,
      }
    }
}