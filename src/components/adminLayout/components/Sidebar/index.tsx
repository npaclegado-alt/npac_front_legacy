import {
  File,
  Lock,
  LucideIcon,
  ShoppingCart,
  Mailbox,
  Receipt,
  Users,
} from "lucide-react";
import { Divider } from "../../../divider";
import styles from "./styleSidebar.module.scss";
import { useCallback, useContext, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ContextApi } from "../../../../contexts";

interface Path {
  name: string;
  path: string;
  icon: LucideIcon;
  active?: boolean;
}

export default function Sidebar() {
  const { user } = useContext(ContextApi);
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

      if (path.includes("http")) {
        window.open(path, "_blank");
        return;
      }
      navigate(path);
    },
    [location, navigate]
  );
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
          <div className={styles.userName}>{user?.name}</div>
          <div className={styles.userId}>#102030AZ</div>
          <div className={styles.userStatus}>Ativo</div>
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
    </aside>
  );
}
