import React from "react";
import { Route, Routes } from "react-router-dom";
import PrivateWrapper from "./PrivateWrapper";
import Login from "../pages/Auth/Login";
import Dashboard from "../pages/Dashboard";
import NotFound from "../pages/NotFound";
import { PageProductsDetails } from "../pages/ProductsDetails/productsDetails";
import Layout from "../components/layout";
import AdminLayout from "../components/adminLayout";
import { PageProducts } from "../pages/Products/pageProducts";
import AdminWrapper from "./AdminWrapper";
import AdminProducts from "../pages/Admin/Products";
import AddProducts from "../pages/Admin/Products/add";

const RootRoutes: React.FC = () => {
  return (
    <Routes>
      <Route element={<PrivateWrapper />}>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="structure" element={<></>} />
          <Route path="career" element={<></>} />
          <Route path="financial" element={<></>} />
          <Route path="documents" element={<></>} />
          <Route path="help" element={<></>} />
          <Route path="products" element={<PageProducts />} />
        </Route>
        <Route
          path="/productDetails/:productId"
          element={<PageProductsDetails />}
        />
        <Route element={<AdminWrapper />}>
          <Route path="/admin/" element={<AdminLayout />}>
            <Route path="products">
              <Route index element={<AdminProducts />} />
              <Route path="add" element={<AddProducts />} />
              <Route path="add/:productId" element={<AddProducts />} />
            </Route>
          </Route>
        </Route>
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/unauthorized" element={<></>} />
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
};

export default RootRoutes;
