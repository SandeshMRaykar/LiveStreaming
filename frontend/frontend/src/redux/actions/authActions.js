import axios from 'axios';

export const register = (formData) => async dispatch => {
    try {
        const res = await axios.post('http://localhost:5000/api/auth/register', formData);
        dispatch({
            type: 'REGISTER_SUCCESS',
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: 'AUTH_ERROR'
        });
    }
};

export const login = (formData) => async dispatch => {
    try {
        const res = await axios.post('http://localhost:5000/api/auth/login', formData);
        dispatch({
            type: 'LOGIN_SUCCESS',
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: 'AUTH_ERROR'
        });
    }
};

export const logout = () => dispatch => {
    dispatch({ type: 'LOGOUT' });
};
