import React from "react";
import { Route, Routes } from "react-router-dom";
import PrivateWrapper from "./PrivateWrapper";
import Login from "../pages/Auth/Login";
import Dashboard from "../pages/Dashboard";
import NotFound from "../pages/NotFound";
import { PageProductsDetails } from "../pages/ProductsDetails/productsDetails";
import Layout from "../components/layout";
import { PageProducts } from "../pages/Products/pageProducts";
import { StructurePage } from "../pages/Structures/structurePage";
import { SpheresFullWideth } from "../pages/SpheresFull/spheresFull";

const RootRoutes: React.FC = () => {
  return (
    <Routes>
      <Route element={<PrivateWrapper />}>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="structure" element={<StructurePage />} />
          <Route path="spheres" element={<SpheresFullWideth />} />
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
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
};

export default RootRoutes;
