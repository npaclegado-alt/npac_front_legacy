import {
  Briefcase,
  File,
  Home,
  Info,
  Layers,
  ShoppingCart,
  Wallet,
} from "lucide-react";
import { Divider } from "../../../divider";
import styles from "./styleSidebar.module.scss";

export default function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.container}>
        <div className={styles.title}>Graduação</div>
        <div className={styles.profileContainer}>
          <div className={styles.profileContainerBg}>
            <img
              alt="perfil"
              className={styles.profile}
              src="https://picsum.photos/200"
            ></img>
          </div>
        </div>
        <div className={styles.userData}>
          <div className={styles.userName}>Davi Carlos Rodrigues</div>
          <div className={styles.userId}>#102030AZ</div>
          <div className={styles.userStatus}>Ativo</div>
        </div>
        <Divider />
        <div className={styles.navList}>
          <div className={styles.activeItem}>
            <Home size={18} />
            Visão Geral
          </div>
          <div className={styles.navItem}>
            <ShoppingCart size={18} />
            Minha Loja
          </div>
          <div className={styles.navItem}>
            <Layers size={18} />
            Estrutura
          </div>
          <div className={styles.navItem}>
            <Briefcase size={18} />
            Carreira
          </div>
          <div className={styles.navItem}>
            <Wallet size={18} />
            Financeiro
          </div>
          <div className={styles.navItem}>
            <File size={18} />
            Documentos
          </div>
          <div className={styles.navItem}>
            <Info size={18} />
            Ajuda
          </div>
        </div>
      </div>
    </aside>
  );
}
