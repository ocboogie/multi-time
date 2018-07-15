import { ActionType, getType } from "typesafe-actions";

import { Timer } from "../types";
import trash from "../actions/trash";

export type TrashState = Array<Timer>;

export type TrashAction = ActionType<typeof trash>;

export default (state: TrashState = [], action: TrashAction) => {
  switch (action.type) {
    case getType(trash.appendTrash):
      return state.concat(action.payload.timer);
    case getType(trash.popTrash):
      return state.slice(0, -1);
    default:
      return state;
  }
};
