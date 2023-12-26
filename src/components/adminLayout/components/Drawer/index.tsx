import React, { useCallback, useContext, useMemo } from "react";
import { Drawer as AntdDrawer } from "antd";
import { ContextApi } from "../../../../contexts";
import styles from "./styleDrawer.module.scss";
import { Divider } from "../../../divider";
import { useLocation, useNavigate } from "react-router-dom";
import {
  File,
  Lock,
  LogOut,
  LucideIcon,
  Mailbox,
  Receipt,
  Settings,
  ShoppingCart,
  UserPlus,
  Users,
} from "lucide-react";

interface Path {
  name: string;
  path: string;
  icon: LucideIcon;
  active?: boolean;
}

export default function Drawer() {
  const { drawerOpen, setDrawerOpen, user, logoutRequest } =
    useContext(ContextApi);
  const location = useLocation();
  const navigate = useNavigate();

  const navItems: Path[] = useMemo(() => {
    const paths = [
      {
        name: "Acesso Agente",
        path: "/",
        icon: Lock,
      },
      {
        name: "Produtos",
        path: "/admin/products",
        icon: ShoppingCart,
      },
      {
        name: "Documentos",
        path: "/admin/documents",
        icon: File,
      },
      {
        name: "Gestão de envios",
        path: "https://sandbox.melhorenvio.com.br/carrinho",
        //path: "https://melhorenvio.com.br/carrinho",
        icon: Mailbox,
      },
      {
        name: "Gestão de vendas",
        path: "/admin/sales",
        icon: Receipt,
      },
      {
        name: "Gestão de usuários",
        path: "/admin/users",
        icon: Users,
      },
    ];

    return paths.map((path) => {
      return { ...path, active: location.pathname === path.path };
    });
  }, [location]);

  const handleNavigate = useCallback(
    (path: string) => {
      if (path === location.pathname) {
        return;
      }
      navigate(path);
      setDrawerOpen(!drawerOpen);
    },
    [drawerOpen, location, navigate, setDrawerOpen]
  );

  return (
    <aside>
      <AntdDrawer
        width={window.innerWidth * 0.75}
        title="Graduação"
        placement="left"
        onClose={() => setDrawerOpen(!drawerOpen)}
        open={drawerOpen}
      >
        <div className={styles.container}>
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
            <div className={styles.userName}>{user?.name}</div>
            <div className={styles.userId}>#102030AZ</div>
            <div className={styles.userStatus}>Ativo</div>
          </div>
          <div className={styles.rowButtons}>
            <UserPlus className={styles.icon} />
            <div className={styles.divider} />
            <Settings className={styles.icon} />
            <div className={styles.divider} />
            <LogOut onClick={logoutRequest} className={styles.icon} />
          </div>
          <Divider />
          <div className={styles.navList}>
            {navItems.map(({ icon: Icon, name, path, active }) => {
              return (
                <div
                  key={path}
                  onClick={() => handleNavigate(path)}
                  className={active ? styles.activeItem : styles.navItem}
                >
                  <Icon size={18} />
                  {name}
                </div>
              );
            })}
          </div>
        </div>
      </AntdDrawer>
    </aside>
  );
}
