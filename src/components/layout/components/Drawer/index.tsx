import React, { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { Drawer as AntdDrawer } from "antd";
import { ContextApi } from "../../../../contexts";
import styles from "./styleDrawer.module.scss";
import { Divider } from "../../../divider";
import AvatarDefaut from "../../../../assets/images/avatar.jpg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Briefcase,
  File,
  Home,
  Info,
  Layers,
  Lock,
  LogOut,
  LucideIcon,
  Settings,
  ShoppingCart,
  UserPlus,
  Wallet,
} from "lucide-react";
import { ROLES } from "../../../../constants/roles";
import CopyToClipboard from "react-copy-to-clipboard";

interface Path {
  name: string;
  path: string;
  icon: LucideIcon;
  active?: boolean;
}

export default function Drawer() {
  const { 
    drawerOpen, 
    setDrawerOpen, 
    user, 
    logoutRequest,
    getFiles,
    files 
  } = useContext(ContextApi);
  const location = useLocation();
  const navigate = useNavigate();

  const link = btoa(user?._id as string);
  const url = window.location.href.split("/");
  const redirectUrlInavtion = url[0] + "//" + url[2] + "/invitation/" + link;

  const [copied, setCopied] = useState<boolean>(false);

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
      setDrawerOpen(!drawerOpen);
    },
    [drawerOpen, location, navigate, setDrawerOpen]
  );

  useEffect(() => {
    if (user) {
      getFiles('avatar', user?._id ?? '');
    }
  }, [user]);

  const avatar = files.find(avatar => avatar.fieldName === 'avatar') ?? null;

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
                src={avatar?.path ?? AvatarDefaut}
              ></img>
            </div>
          </div>
          <div className={styles.userData}>
            <div className={styles.userName}>{user?.name}</div>
            <div className={styles.userId}>#102030AZ</div>
            <div className={styles.userStatus}>Ativo</div>
          </div>
          <div className={styles.rowButtons}>
            <Link
              to={"https://leonardomarcondes.com.br/destrava11sp/"}
              target="_blank"
              className={styles.orangeButton}
            >
              Destrava
            </Link>
            <Link
              to={
                "https://escola.npac.com.br/auth/login?redirect=/office/minha_cademi/aparencia"
              }
              target="_blank"
              className={styles.orangeButton}
            >
              Escola NPAC
            </Link>
          </div>
          <div className={styles.rowButtons}>
            <CopyToClipboard
              text={redirectUrlInavtion}
              onCopy={(copy) => {
                setCopied(true);
                setTimeout(() => {
                  setCopied(false);
                }, 2000);
              }}
            >
              <UserPlus
                color={copied ? "#00ff00" : "#8B8B8B"}
                className={styles.icon}
              />
            </CopyToClipboard>

            <div className={styles.divider} />
            <Settings
              onClick={() => handleNavigate("/agent-profile")}
              className={styles.icon}
            />
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
