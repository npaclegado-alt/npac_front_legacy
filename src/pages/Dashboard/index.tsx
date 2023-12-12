import React, { useContext, useEffect, useState } from "react";
import styles from "./dashboard.module.scss";
import { Progress } from "antd";
import { Filter, Gift } from "lucide-react";
import { ContextApi } from "../../contexts";
import Filters from "../../libs/Filters";
import { mainScreemDetails } from "../../services/requests/main";
import { useExtractChildren } from "../../hooks/useExtractChildren";
import moment from "moment";
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
  const { user, spheresResp, getAllCommissionsByUserId, getSpheresByUser } =
    useContext(ContextApi);
  const children = useExtractChildren(spheresResp);
  const [apiData, setApiData] = useState<MainScreemData | null>(null);

  useEffect(() => {
    const details = localStorage.getItem("mainScreemDetails");
    if (details) {
      setApiData(JSON.parse(details));
    }
    if (user) {
      mainScreemDetails(user._id)
        .then((response: any) => {
          localStorage.setItem(
            "mainScreemDetails",
            JSON.stringify(response.data)
          );
          return setApiData(response.data as any);
        })
        .catch((error) => {
          console.error("Erro ao buscar dados", error);
        });
      getSpheresByUser(user._id);
    }
  }, [user, getAllCommissionsByUserId]);

  const calculateProgress = () => {
    if (apiData && apiData.levelInfo) {
      const totalPoints =
        apiData.levelInfo.nextLevel.max - apiData.levelInfo.currentLevel.start;
      const currentPoints = apiData.levelInfo.nextLevel.amountToNextLevel;
      console.log(totalPoints, currentPoints);
      return (currentPoints / totalPoints) * 100;
    }
    return 0;
  };

  console.log("apiData ==>", apiData);

  function formatCountdown() {
    const now = moment();
    const targetDate = now.clone().date(8).hour(23).minute(0).second(0);

    if (now.date() >= 8 && now.hour() >= 23) {
      targetDate.add(1, "month");
    }

    const diff = targetDate.diff(now);
    const duration = moment.duration(diff);

    const days = Math.floor(duration.asDays());
    const hours = duration.hours();
    const minutes = duration.minutes();
    const seconds = duration.seconds();

    return `${days} Dias, ${hours}H e ${minutes}M`;
  }

  const formattedCountdown = formatCountdown();

  return (
    <section className={styles.deshBoardPage}>
      <div className={styles.deshBoardPageAuff}>
        <h2>AUFFS Gerados</h2>

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
            <span>
              {Filters.convertMoneyTextMask(apiData?.userBalance.money)}
            </span>
          </div>
          <div className={styles.deshBoardPageTotalsItem}>
            <h4>Lucro Total</h4>
            <span>{Filters.convertMoneyTextMask(apiData?.total)}</span>
          </div>
        </div>

        <div className={styles.borderCenterTotals} />

        <div className={styles.deshBoardPageTotalsInfomation}>
          <div className={styles.deshBoardPageTotalsItem}>
            <h4>Grupo</h4>
            <span>{children?.length} Pessoas</span>
          </div>
          <div className={styles.deshBoardPageTotalsItem}>
            <h4>Fim do Mês</h4>
            <span>{formattedCountdown}</span>
          </div>
        </div>
      </div>

      <div className={styles.deshBoardPageImage} />
    </section>
  );
};

export default Dashboard;
