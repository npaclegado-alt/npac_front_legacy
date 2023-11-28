import React from "react";
import { Route, Routes } from "react-router-dom";
import PrivateWrapper from "./PrivateWrapper";
import Login from "../pages/Auth/Login";
import Dashboard from "../pages/Dashboard";
import NotFound from "../pages/NotFound";
import Career from "../pages/Career";
import { PageProductsDetails } from "../pages/ProductsDetails/productsDetails";
import Layout from "../components/layout";
import AdminLayout from "../components/adminLayout";
import { PageProducts } from "../pages/Products/pageProducts";
import { StructurePage } from "../pages/Structures/structurePage";
import AdminWrapper from "./AdminWrapper";
import AdminProducts from "../pages/Admin/Products";
import AddProducts from "../pages/Admin/Products/add";
import { Invitation } from "../pages/Invitation";
import AdminDocuments from "../pages/Admin/Documents";
import AddDocuments from "../pages/Admin/Documents/add";
import { Financial } from "../pages/Financial";
import { Help } from "../pages/Help";
import AgentProfile from "../pages/AgentProfile";

const RootRoutes: React.FC = () => {
  return (
    <Routes>
      <Route element={<PrivateWrapper />}>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="structure" element={<StructurePage />} />
          <Route path="career" element={<Career />} />
          <Route path="financial" element={<Financial />} />
          <Route path="products" element={<PageProducts />} />
          <Route path="agent-profile" element={<AgentProfile />} />
          <Route path="documents" element={<></>} />
          <Route path="help" element={<Help />} />
          <Route path="products" element={<PageProducts />} />
        </Route>
        <Route element={<AdminWrapper />}>
          <Route path="/admin/" element={<AdminLayout />}>
            <Route path="products">
              <Route index element={<AdminProducts />} />
              <Route path="add" element={<AddProducts />} />
              <Route path="add/:productId" element={<AddProducts />} />
            </Route>
            <Route path="documents">
              <Route index element={<AdminDocuments />} />
              <Route path="add" element={<AddDocuments />} />
              <Route path="add/:documentId" element={<AddProducts />} />
            </Route>
          </Route>
        </Route>
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/invitation/:userId" element={<Invitation />} />
      <Route path="/unauthorized" element={<></>} />
      <Route path="/*" element={<NotFound />} />
      <Route
        path="/productDetails/:productId"
        element={<PageProductsDetails />}
      />
    </Routes>
  );
};

export default RootRoutes;
