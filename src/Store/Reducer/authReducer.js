import { USER_REGISTERED, USER_LOGOUT } from "../Constant/authConst";

const INIT_STATE = {
  user: null,
};

export default function authReducer(state = INIT_STATE, action) {
  switch (action.type) {
    case USER_REGISTERED:
      return {
        ...state,
        user: action.payload,
      };
    case USER_LOGOUT:
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
}
