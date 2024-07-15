import axios from 'axios';

export const getNotifications = () => async dispatch => {
    try {
        const res = await axios.get('/api/notifications');
        dispatch({
            type: 'GET_NOTIFICATIONS',
            payload: res.data
        });
    } catch (err) {
        console.error(err);
    }
};

export const newNotification = (notification) => dispatch => {
    dispatch({
        type: 'NEW_NOTIFICATION',
        payload: notification
    });
};
