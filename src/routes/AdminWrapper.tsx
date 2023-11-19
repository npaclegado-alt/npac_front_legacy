import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { ContextApi } from "../contexts";
import { ROLES } from "../constants/roles";

const AdminWrapper: React.FC = () => {
  const { user } = useContext(ContextApi);

  if (user?.role !== ROLES.admin) {
    return <Navigate to="/unauthorized" />;
  }

  return <Outlet />;
};

export default AdminWrapper;
