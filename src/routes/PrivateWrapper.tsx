import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { ContextApi } from "../contexts";
import api from "../services/api";

const PrivateWrapper: React.FC = () => {
  const { isAuthenticated, user } = useContext(ContextApi);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (user) {
    //TODO expiração de token
    api.defaults.headers.Authorization = `Bearer ${user.token}`;
  }

  return <Outlet />;
};

export default PrivateWrapper;
