import React from "react";
import { Route, Routes } from 'react-router-dom'
import PrivateWrapper from "./PrivateWrapper";
import Login from "../pages/Auth/Login";
import Dashboard from "../pages/Dashboard";
import NotFound from "../pages/NotFound";

const RootRoutes: React.FC = () => {
  return (
      <Routes>
        <Route element={<PrivateWrapper />}>
          <Route path="/" element={<Dashboard />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
  );
}

export default RootRoutes;
