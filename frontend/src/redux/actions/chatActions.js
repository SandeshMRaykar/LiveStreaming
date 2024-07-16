import axios from "axios";
export const getMessages = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/chat");
    dispatch({
      type: 'GET_MESSAGES',
      payload: res.data,
    });
  } catch (err) {
    console.error(err);
  }
};

export const newMessage = (message) => (dispatch) => {
  dispatch({
    type: 'NEW_MESSAGE',
    payload: message,
  });
};
