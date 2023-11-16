import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Outlet } from "react-router-dom";
import styles from "./styleAdminLayout.module.scss";
import Drawer from "./components/Drawer";

const AdminLayout = () => {
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const handleResize = () => {
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };
  useEffect(() => {
    window.addEventListener("resize", handleResize, false);
  }, []);
  return (
    <React.Fragment>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.scroll}>
          {dimensions.width <= 768 ? <Drawer /> : <Sidebar />}
        </div>
        <main className={styles.content}>
          <Outlet />
        </main>
      </div>
    </React.Fragment>
  );
};

export default AdminLayout;
