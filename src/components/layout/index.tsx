import React, { useContext, useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Link, Outlet } from "react-router-dom";
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
          {displayButtonChat && <Link to={"https://wa.me/5528999156465?text=Preciso+de+ajuda+para%3A"} target="_blank">
            <button className={styles.buttonChat} />
          </Link>}
        </main>
      </div>
    </React.Fragment>
  );
};

export default Layout;
