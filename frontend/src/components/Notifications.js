import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import api from "../api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      const { data } = await api.get("/notifications/6123456789abcdef01234567");
      setNotifications(data);
    };

    fetchNotifications();

    const socket = io("http://localhost:5000");
    socket.on("notification", (notification) => {
      toast(notification.message);
      setNotifications((prev) => [...prev, notification]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  console.log("Notifications rendered", notifications);

  return (
    <div>
      <h1>Notifications</h1>
      <ul>
        {notifications.map((notification) => (
          <li key={notification._id}>{notification.message}</li>
        ))}
      </ul>
      <ToastContainer />
    </div>
  );
};

export default Notifications;
