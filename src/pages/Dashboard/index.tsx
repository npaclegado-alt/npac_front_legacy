import React, { useContext, useEffect, useState } from "react";
import styles from "./dashboard.module.scss";
import { Progress } from "antd";
import { Gift } from "lucide-react";
import { ContextApi } from "../../contexts";
import Filters from "../../libs/Filters";
import { mainScreemDetails } from "../../services/requests/main";
type MainScreemData = {
  userBalance: {
    _id: string;
    userId: string;
    money: number;
    virtualCurrency: number;
    __v: number;
  };
  levelInfo: {
    currentLevel: {
      position: string;
      start: number;
      max: number;
    };
    nextLevel: {
      position: string;
      start: number;
      max: number;
      amountToNextLevel: number;
    };
  };
  total: number;
  month: number;
};

const Dashboard: React.FC = () => {
  const { user, getAllCommissionsByUserId } = useContext(ContextApi);
  const [apiData, setApiData] = useState<MainScreemData | null>(null);
  useEffect(() => {
    if (user) {
      mainScreemDetails(user._id)
        .then((response: any) => {
          console.log(response.data);
          return setApiData(response.data as any);
        })
        .catch((error) => {
          console.error("Erro ao buscar dados", error);
        });
    }
  }, [user, getAllCommissionsByUserId]);

  const calculateProgress = () => {
    if (apiData && apiData.levelInfo) {
      const totalPoints =
        apiData.levelInfo.nextLevel.max - apiData.levelInfo.currentLevel.start;
      const currentPoints = apiData.levelInfo.nextLevel.amountToNextLevel;
      return (currentPoints / totalPoints) * 100;
    }
    return 0;
  };
  return (
    <section className={styles.deshBoardPage}>
      <div className={styles.deshBoardPageAuff}>
        <h2>Auffs Gerados</h2>

        <div className={styles.deshBoardPageAuffProgress}>
          <span>{apiData?.userBalance.virtualCurrency}</span>
          <Progress
            percent={calculateProgress()}
            showInfo={false}
            trailColor="#F2F2F2"
            strokeColor="#F04E23"
            size={["100%", 12]}
            className={styles.progress}
          />
          <div className={styles.deshBoardPageAuffGift}>
            <span>{apiData?.levelInfo.nextLevel.start}</span>
            <Gift size={"2rem"} color="#F04E23" />
          </div>
        </div>

        <div className={styles.deshBoardPageAuffLevel}>
          <div className={styles.deshBoardPageAuffLevelContainer}>
            <h3>Nível Atual</h3>
            <div className={styles.deshBoardPageAuffPointsContainer}>
              <span>{apiData?.userBalance.virtualCurrency} Pontos Atuais</span>
              <span>{apiData?.levelInfo.currentLevel.position}</span>
            </div>
          </div>

          <div className={styles.deshBoardPageAuffLevelContainer}>
            <h3>Próximo Nível</h3>
            <div className={styles.deshBoardPageAuffPointsContainer}>
              <span>
                {apiData?.levelInfo.nextLevel.amountToNextLevel} Pontos
                Restantes
              </span>
              <span>{apiData?.levelInfo.nextLevel.position}</span>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.deshBoardPageTotals}>
        <div className={styles.deshBoardPageTotalsInfomation}>
          <div className={styles.deshBoardPageTotalsItem}>
            <h4>Lucro Disponível</h4>
            <span>R$ {apiData?.userBalance.money}</span>
          </div>
          <div className={styles.deshBoardPageTotalsItem}>
            <h4>Lucro Total</h4>
            <span>R$ 0</span>
          </div>
        </div>

        <div className={styles.borderCenterTotals} />

        <div className={styles.deshBoardPageTotalsInfomation}>
          <div className={styles.deshBoardPageTotalsItem}>
            <h4>Grupo</h4>
            <span>R$ 0</span>
          </div>
          <div className={styles.deshBoardPageTotalsItem}>
            <h4>Fim do Mês</h4>
            <span>R$ {apiData?.month}</span>
          </div>
        </div>
      </div>

      <div className={styles.deshBoardPageImage} />
    </section>
  );
};

export default Dashboard;
