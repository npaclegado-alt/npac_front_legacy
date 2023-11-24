import {LogOut, Menu, Settings, UserPlus } from "lucide-react";
import styles from "./styleNavbar.module.scss";
import { ContextApi } from "../../../../contexts";
import { useContext, useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";

export default function Navbar() {
  const { logoutRequest, drawerOpen, setDrawerOpen, user } = useContext(ContextApi);

  const link = btoa(user?._id as string)
  const location = window.location.href.split('/');
  const redirectUrlInavtion = location[0] + '//' + location[2] + '/invitation/' + link;

  const [copied, setCopied] = useState<boolean>(false);

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
            
            <CopyToClipboard
              text={redirectUrlInavtion}
              onCopy={(copy) => {
                setCopied(true);
                setTimeout(() => {
                  setCopied(false);
                }, 2000);
              }}
            >
              <UserPlus className={styles.icon} color={copied ?  '#00ff00' : '#8B8B8B'}/>
            </CopyToClipboard>

          <div className={styles.divider} />
          <Settings className={styles.icon} />
          <div className={styles.divider} />
          <LogOut onClick={logoutRequest} className={styles.icon} />
        </div>
      </div>
    </div>
  );
}
