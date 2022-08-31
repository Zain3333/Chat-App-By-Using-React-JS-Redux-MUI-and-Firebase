import {
  CLEAR_CHAT,
  CLEAR_RECEPIENT,
  GET_ALL_CHATS,
  GET_ALL_RECEPIENT,
} from "../Constant/chatConst";

const INIT_STATE = {
  chat: [],
  recepients: [],
};

export default function chatReducer(state = INIT_STATE, action) {
  switch (action.type) {
    case GET_ALL_RECEPIENT:
      const allRecepients = state.recepients.slice(0);
      let newUser = true;
      allRecepients.map((recipient) => {
        if (recipient.id === action.payload.id) {
          newUser = false;
        }
      });

      if (allRecepients.length === 0 || newUser) {
        allRecepients.push(action.payload);
      }
      return {
        ...state,
        recepients: allRecepients,
      };
    case CLEAR_RECEPIENT: {
      return {
        ...state,
        recepients: [],
      };
    }
    case GET_ALL_CHATS: {
      let chatClone = state.chat.slice(0);
      chatClone.push(action.payload);
      return {
        ...state,
        chat: chatClone,
      };
    }
    case CLEAR_CHAT: {
      return {
        ...state,
        chat: [],
      };
    }
    default:
      return state;
  }
}
