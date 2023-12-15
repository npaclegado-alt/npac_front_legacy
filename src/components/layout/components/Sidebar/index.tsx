import {
  Briefcase,
  File,
  Home,
  Info,
  Layers,
  Lock,
  LucideIcon,
  ShoppingCart,
  Wallet,
} from "lucide-react";
import { Divider } from "../../../divider";
import styles from "./styleSidebar.module.scss";
import { useCallback, useContext, useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ContextApi } from "../../../../contexts";
import { ROLES } from "../../../../constants/roles";

interface Path {
  name: string;
  path: string;
  icon: LucideIcon;
  active?: boolean;
}

export default function Sidebar() {
  const { 
    user,
    getFiles,
    files 
  } = useContext(ContextApi);
  const location = useLocation();
  const navigate = useNavigate();

  const navItems: Path[] = useMemo(() => {
    const paths = [
      {
        name: "Visão Geral",
        path: "/",
        icon: Home,
      },
      {
        name: "Minha Loja",
        path: "/products",
        icon: ShoppingCart,
      },
      {
        name: "Estrutura",
        path: "/structure",
        icon: Layers,
      },
      {
        name: "Carreira",
        path: "/career",
        icon: Briefcase,
      },
      {
        name: "Financeiro",
        path: "/financial",
        icon: Wallet,
      },
      {
        name: "Documentos",
        path: "/documents",
        icon: File,
      },
      {
        name: "Ajuda",
        path: "/help",
        icon: Info,
      },
    ];
    const fullPaths =
      user?.role === ROLES.admin
        ? [
            {
              name: "Acesso Admin",
              path: "/admin",
              icon: Lock,
            },
            ...paths,
          ]
        : paths;
    return fullPaths.map((path) => {
      return { ...path, active: location.pathname === path.path };
    });
  }, [location, user]);

  const handleNavigate = useCallback(
    (path: string) => {
      if (path === location.pathname) {
        return;
      }
      navigate(path);
    },
    [location, navigate]
  );

  useEffect(() => {
    if (user) {
      getFiles('avatar', user?._id ?? '');
    }
  }, [user]);

  const avatar = files.find(avatar => avatar.fieldName === 'avatar') ?? null;
  const avatarDefault = require('../../../../assets/images/user.png');

  return (
    <aside className={styles.sidebar}>
      <div className={styles.container}>
        <div className={styles.title}>{user?.graduation ?? 'Graduação'}</div>
        <div className={styles.profileContainer}>
          <div className={styles.profileContainerBg}>
            <img
              alt="perfil"
              className={styles.profile}
              src={avatar?.path ?? avatarDefault}
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
