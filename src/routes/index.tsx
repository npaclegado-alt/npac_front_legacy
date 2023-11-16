import React from "react";
import { Route, Routes } from "react-router-dom";
import PrivateWrapper from "./PrivateWrapper";
import Login from "../pages/Auth/Login";
import Dashboard from "../pages/Dashboard";
import NotFound from "../pages/NotFound"; 
import Career from "../pages/Career"
import { PageProductsDetails } from "../pages/ProductsDetails/productsDetails";
import Layout from "../components/layout";
import { PageProducts } from "../pages/Products/pageProducts"; 
import {Financial} from '../pages/Financial'

const RootRoutes: React.FC = () => {
  return (
    <Routes>
      <Route element={<PrivateWrapper />}>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="structure" element={<></>} />
          <Route path="career" element={<Career />} />
          <Route path="financial" element={<Financial />} />
          <Route path="documents" element={<></>} />
          <Route path="help" element={<></>} />
          <Route path="products" element={<PageProducts />} />
        </Route>
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/*" element={<NotFound />} />
      <Route
        path="/productDetails/:productId"
        element={<PageProductsDetails />}
      />
    </Routes>
  );
};

export default RootRoutes;
