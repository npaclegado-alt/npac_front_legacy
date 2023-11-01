import React, { useContext, useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Outlet } from "react-router-dom";
import styles from "./styleLayout.module.scss";
import { ContextApi } from "../../contexts";

const Layout = () => {
  const { sidebarOpen } = useContext(ContextApi);
  const [localSidebarOpen, setLocalSidebarOpen] = useState(true);

  useEffect(() => {
    if (window.innerWidth <= 1000) {
      setLocalSidebarOpen(sidebarOpen);
    }
  }, [sidebarOpen]);

  return (
    <React.Fragment>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.scroll}>
          <Sidebar />
        </div>
        <main
          className={styles.content}
          style={
            localSidebarOpen
              ? { marginLeft: "18.3rem" }
              : { marginLeft: "1.5rem" }
          }
        >
          <Outlet />
        </main>
      </div>
    </React.Fragment>
  );
};

export default Layout;
