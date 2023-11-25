import React, { useContext, useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Outlet } from "react-router-dom";
import styles from "./styleLayout.module.scss";
import Drawer from "./components/Drawer";
import { ContextApi } from "../../contexts";

interface Page {
  pathname: string;
}

const Layout = () => {
  const { dimensions } = useContext(ContextApi);

  const [displayButtonChat, setDisplayButtonChat] = useState(false);

  const hidePageChatButton: Page[] = [
    // {exemplo
    //   pathname: "/financial",
    // },
  ];

  const pathPage = hidePageChatButton.find(
    (page) => page.pathname === window.location.pathname
  ) as Page;

  useEffect(() => {
    if (pathPage) {
      setDisplayButtonChat(false);
    } else {
      setDisplayButtonChat(true);
    }
  }, [pathPage]);

  return (
    <React.Fragment>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.scroll}>
          {dimensions.width <= 768 ? <Drawer /> : <Sidebar />}
        </div>
        <main className={styles.content}>
          <Outlet />
          {displayButtonChat && <button className={styles.buttonChat} />}
        </main>
      </div>
    </React.Fragment>
  );
};

export default Layout;
