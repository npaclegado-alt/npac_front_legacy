import { Outlet } from "react-router-dom";
import styles from "./styleSidebar.module.scss";

export default function Sidebar() {
  return (
    <div className={styles.container}>
      <aside aria-label="Sidenav" className={styles.sidebar}>
        <div>sidebar</div>
      </aside>
      <main className={styles.content}>
        <Outlet />
      </main>
    </div>
  );
}
