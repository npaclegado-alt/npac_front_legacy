import styles from "./styleNavbar.module.scss";

export default function Navbar() {
  return (
    <div className={styles.navbar}>
      <div>PlanoNPAC</div>
      <div className={styles.actions}>
        <div>Destrava</div>
        <div>Escola NPAC</div>
        <div>user+</div>
        <div>config</div>
        <div>logout</div>
      </div>
    </div>
  );
}
