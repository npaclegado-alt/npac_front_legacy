import React from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Outlet } from "react-router-dom";
import styles from "./styleLayout.module.scss";

const Layout = () => {
  return (
    <React.Fragment>
      <Navbar />
      <div className={styles.container}>
        <Sidebar />
        <main className={styles.content}>
          <Outlet />
        </main>
      </div>
    </React.Fragment>
  );
};

export default Layout;
