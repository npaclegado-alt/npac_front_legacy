import React, { useContext, useEffect } from "react";
import moment from "moment";
import { Navigate, Outlet } from "react-router-dom";
import { ContextApi } from "../contexts";
import api from "../services/api";
import { tokenRefresh } from "../services/requests/auth";
import { toast } from "react-toastify";

const PrivateWrapper = () => {
  const { isAuthenticated, user, logoutRequest } = useContext(ContextApi);

  const refreshAuthToken = async (refreshToken: string) => {
    try {
      const response = await tokenRefresh(refreshToken);
      const { token: newToken, expiresIn } = response.data;
      let updatedUser = user;
      if (updatedUser) {
        updatedUser.token = newToken;
        updatedUser.expiresIn = expiresIn;
      }
      localStorage.setItem("user", JSON.stringify(updatedUser));

      api.defaults.headers.Authorization = `Bearer ${newToken}`;
    } catch (error) {
      logoutRequest();
    }
  };

  const tokenWillExpire = () => {
    const tenMinutesBeforeNow = moment().subtract(10, "minutes");

    if (user?.expiresIn) {
      const expiryTime = moment(user.expiresIn);
      return tenMinutesBeforeNow.isAfter(expiryTime);
    }

    return true;
  };

  useEffect(() => {
    const checkAndRefreshToken = async () => {
      if (user?.token && tokenWillExpire()) {
        await refreshAuthToken(user.token);
      }
    };

    checkAndRefreshToken();
  }, [user?.token]);

  if (user?.token) {
    api.defaults.headers.Authorization = `Bearer ${user.token}`;
    const expired = moment().isAfter(moment(user.expiresIn));
    if (expired) {
      logoutRequest();
      toast.error("Sessão expirada. Faça login novamente!");
      return <Navigate to="/login" replace />;
    }
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default PrivateWrapper;
