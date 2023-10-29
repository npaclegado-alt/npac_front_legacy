import React from "react";
import { Route, Routes } from 'react-router-dom'
import PrivateWrapper from "./PrivateWrapper";
import Login from "../pages/Auth/Login";
import Dashboard from "../pages/Dashboard";
import NotFound from "../pages/NotFound";
import Layout from "../components/layout";

const RootRoutes: React.FC = () => {
  return (
      <Routes>
        <Route element={<PrivateWrapper />}>
          <Route path="/" element={<Layout />} >
            <Route index element={<Dashboard />} />
          </Route>
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
  );
}

export default RootRoutes;
