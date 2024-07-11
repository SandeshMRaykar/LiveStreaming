import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import LiveStreamPage from "./components/LiveStreamPage";
import Notifications from "./components/Notifications";
import UserProfile from "./components/UserProfile";
import { Provider } from "react-redux";
import store from "./store";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import "./App.css";
import Chat from "./components/Chat";

function App() {
  return (
    <div className="container">
      <Provider store={store}>
        <Router>
          <Routes>
            <Route  path="/HomePage" element={<HomePage />} />
            <Route  path="/" element={<LoginPage />} />
            <Route  path="/live" element={<LiveStreamPage />} />
            <Route
              path="/notifications"
              element={<Notifications />}
            />
        <Route  path="/Chat" element={<Chat />} />

            <Route  path="/profile" element={<UserProfile />} />
            <Route  path="/login" element={<LoginPage />} />
            <Route
              path="/register"
              element={<RegisterPage />}
            />
          </Routes>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
