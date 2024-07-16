import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getNotifications } from '../redux/actions/notificationActions';
import { toast } from 'react-toastify';

const Notifications = () => {
    const dispatch = useDispatch();
    const notifications = useSelector(state => state.notifications.notifications);

    useEffect(() => {
        dispatch(getNotifications());
    }, [dispatch]);

    useEffect(() => {
        notifications.forEach(notification => {
            toast(notification.message);
        });
    }, [notifications]);

    return (
        <div>
            <h1>Notifications Page</h1>
            <ul>
                {notifications.map(notification => (
                    <li key={notification._id}>{notification.message}</li>
                ))}
            </ul>
        </div>
    );
};

export default Notifications;
