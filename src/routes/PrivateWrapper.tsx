import React, { useContext, useEffect } from "react";
import moment from 'moment';
import { Navigate, Outlet } from "react-router-dom";
import { ContextApi } from "../contexts";
import api from "../services/api";
import { tokenRefresh } from "../services/requests/auth";

const PrivateWrapper = () => {
  const { isAuthenticated, user } = useContext(ContextApi);

  const refreshAuthToken = async (refreshToken: string) => {
    try {
      const response = await tokenRefresh(refreshToken);
      const { token: newToken, expiresIn } = response.data;
      let updatedUser = user
      if (updatedUser) {
        updatedUser.token = newToken;
        updatedUser.expiresIn = expiresIn;
      }
      localStorage.setItem('user', JSON.stringify(updatedUser));

      api.defaults.headers.Authorization = `Bearer ${newToken}`;

    } catch (error) {
      logoutRequest();
      console.error('Error refreshing auth token:', error);
    }
  };

  const tokenWillExpire = () => {
    const tenMinutesBeforeNow = moment().subtract(10, 'minutes');

    if (user?.expiresIn) {
      const expiryTime = moment(user.expiresIn);
      return tenMinutesBeforeNow.isAfter(expiryTime);
    }

    return true;
  };

  useEffect(() => {
    if (user?.token) {
      api.defaults.headers.Authorization = `Bearer ${user.token}`;
    }

    const checkAndRefreshToken = async () => {

      if (user?.token && tokenWillExpire()) {
        await refreshAuthToken(user.token);
      }
    };

    checkAndRefreshToken();
  }, [user?.token]);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default PrivateWrapper;
function logoutRequest() {
  throw new Error("Function not implemented.");
}

