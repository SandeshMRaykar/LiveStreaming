import axios from 'axios';

export const startStream = () => async dispatch => {
    try {
        const res = await axios.post('http://localhost:5000/api/stream/start');
        dispatch({
            type: 'START_STREAM',
            payload: res.data,
        });
        return res.data;
    } catch (error) {
        console.error('Error starting stream:', error);
    }
};

export const endStream = (roomSid) => async dispatch => {
    try {
        await axios.post('http://localhost:5000/api/stream/end', { roomSid });
        dispatch({
            type: 'END_STREAM',
        });
    } catch (error) {
        console.error('Error ending stream:', error);
    }
};

export const getStreamUrl = () => async dispatch => {
    try {
        const res = await axios.get('http://localhost:5000/api/stream/url');
        dispatch({
            type: 'GET_STREAM_URL',
            payload: res.data,
        });
    } catch (error) {
        console.error('Error getting stream URL:', error);
    }
};
