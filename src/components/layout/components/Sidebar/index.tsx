import { Divider } from "../../../divider";
import styles from "./styleSidebar.module.scss";

export default function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.container}>
        <div>Graduação</div>
        <div>foto perfil</div>
        <div>Davi Carlos Rodrigues</div>
        <div>#102030AZ</div>
        <div>Ativo</div>
        <Divider />
        <div>Visão Geral</div>
        <div>Minha Loja</div>
        <div>Estrutura</div>
        <div>Carreira</div>
        <div>Financeiro</div>
        <div>Ajuda</div>
      </div>
    </aside>
  );
}
