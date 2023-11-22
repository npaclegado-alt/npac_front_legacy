import React from "react";
import styles from './dashboard.module.scss'
import { Progress } from 'antd';
import { Gift } from "lucide-react";  




const Dashboard: React.FC = () => {
  return (
    <section className={styles.deshBoardPage}>
      <div className={styles.deshBoardPageAuff}>
        <h2>Auffs Gerados</h2>

        <div className={styles.deshBoardPageAuffProgress}>
          <span>0</span>
          <Progress percent={70} showInfo={false} trailColor="#F2F2F2" strokeColor="#F04E23" size={['100%', 12]} className={styles.progress} />
          <div className={styles.deshBoardPageAuffGift}>
            <span>1000</span>
            <Gift size={'2rem'} color="#F04E23" />
          </div>
        </div>

        <div className={styles.deshBoardPageAuffLevel}>
          <div className={styles.deshBoardPageAuffLevelContainer}>
            <h3>Nível Atual</h3>
            <div className={styles.deshBoardPageAuffPointsContainer}>
              <span>850 Pontos Atuais</span>
              <span>Agente Comum</span>
            </div>
          </div>
  
          <div className={styles.deshBoardPageAuffLevelContainer}>
            <h3>Próximo Nível</h3>
            <div className={styles.deshBoardPageAuffPointsContainer}>
              <span>150 Pontos Restantes</span>
              <span>Agente Premium</span>
            </div>
          </div>

        </div>

      </div>
      <div className={styles.deshBoardPageTotals}>

        <div className={styles.deshBoardPageTotalsInfomation}>
          <div className={styles.deshBoardPageTotalsItem}>
            <h4>Lucro Disponível</h4>
            <span>R$ 999,99</span>
          </div>
          <div className={styles.deshBoardPageTotalsItem}>
            <h4>Lucro Total</h4>
            <span>R$ 999,99</span>
          </div>
        </div> 

        <div className={styles.borderCenterTotals} />

        <div className={styles.deshBoardPageTotalsInfomation}>
          <div className={styles.deshBoardPageTotalsItem}>
            <h4>Grupo</h4>
            <span>R$ 999,99</span>
          </div>
          <div className={styles.deshBoardPageTotalsItem}>
            <h4>Fim do Mês</h4>
            <span>R$ 999,99</span>
          </div>
        </div>
      </div>

      <div className={styles.deshBoardPageImage} />    
    </section>
  );
};

export default Dashboard;
