import { combineReducers } from 'redux';
import authReducer from './authReducer';
import notificationReducer from './notificationReducer';
import chatReducer from './chatReducer';

export default combineReducers({
    auth: authReducer,
    notifications: notificationReducer,
    chat: chatReducer
});
