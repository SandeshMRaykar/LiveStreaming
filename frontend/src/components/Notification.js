import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getNotifications } from '../redux/actions/notificationActions';
import { toast } from 'react-toastify';

const Notification = () => {
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

    return null;
};

export default Notification;
