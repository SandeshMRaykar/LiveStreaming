import axios from 'axios';

export const register = (formData) => async dispatch => {
    try {
        const res = await axios.post('http://localhost:5000/api/auth/register', formData);
        dispatch({
            type: 'REGISTER_SUCCESS',
            payload: res.data
        });
        return { success: true };
    } catch (err) {
        dispatch({
            type: 'AUTH_ERROR'
        });
        return { success: false };
    }
};

export const login = (formData) => async dispatch => {
    try {
        const res = await axios.post('http://localhost:5000/api/auth/login', formData);
        dispatch({
            type: 'LOGIN_SUCCESS',
            payload: res.data
        });
        return { success: true, firstName: res.data.user.firstName };
    } catch (err) {
        dispatch({
            type: 'AUTH_ERROR'
        });
        return { success: false };
    }
};

export const logout = () => dispatch => {
    dispatch({ type: 'LOGOUT' });
};
