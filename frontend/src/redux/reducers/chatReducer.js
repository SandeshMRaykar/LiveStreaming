import { getMessages, newMessage } from "../actions/chatActions";

const initialState = {
  messages: [],
};

export default function chatReducer(state = initialState, action) {
  switch (action.type) {
    case getMessages:
      return {
        ...state,
        messages: action.payload,
      };
    case newMessage:
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };
    default:
      return state;
  }
}
