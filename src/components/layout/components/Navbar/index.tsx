import { LogOut, Menu, Settings, UserPlus } from "lucide-react";
import styles from "./styleNavbar.module.scss";
import { ContextApi } from "../../../../contexts";
import { useContext } from "react";

export default function Navbar() {
  const { logoutRequest, drawerOpen, setDrawerOpen } = useContext(ContextApi);

  return (
    <div className={styles.background}>
      <div className={styles.navbar}>
        <div className={styles.leftContainer}>
          <div className={styles.menu}>
            <Menu
              onClick={() => setDrawerOpen(!drawerOpen)}
              className={styles.icon}
            />
          </div>
          <div className={styles.logo}>
            <h4>
              Plano<span>NPAC</span>
            </h4>
          </div>
        </div>
        <div className={styles.actions}>
          <div className={styles.orangeButton}>Destrava</div>
          <div className={styles.grayButton}>Escola NPAC</div>
          <UserPlus className={styles.icon} />
          <div className={styles.divider} />
          <Settings className={styles.icon} />
          <div className={styles.divider} />
          <LogOut onClick={logoutRequest} className={styles.icon} />
        </div>
      </div>
    </div>
  );
}
