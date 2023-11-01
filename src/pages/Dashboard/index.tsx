import React from "react";
import styles from './dashboard.module.scss'

const Dashboard: React.FC = () => {
  return (
    <section className={styles.deshBoardPage}>
      <div className={styles.deshBoardPageAuff}>
         <h2>Auffs Gerados</h2>
        <div>
        </div> 
        <div>2</div>
      </div>
      <div className={styles.deshBoardPageTotals}>
        2
      </div> 

      <div className={styles.deshBoardPageImage}>
        2
      </div>
    </section>
  );
};

export default Dashboard;
