import React, { useContext, useEffect, useState } from "react";
import styles from "./dashboard.module.scss";
import { Progress } from "antd";
import { Filter, Gift } from "lucide-react";
import { ContextApi } from "../../contexts";
import Filters from "../../libs/Filters";
import { mainScreemDetails } from "../../services/requests/main";
import { useExtractChildren } from "../../hooks/useExtractChildren";
import moment from "moment";
type DecimalNumber = {
  $numberDecimal: string;
};

type MainScreemData = {
  userBalance: {
    _id: string;
    userId: string;
    money: DecimalNumber;
    virtualCurrency: DecimalNumber;
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
      amountToNextLevel: string;
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
  const [loading, setLoading] = useState(true);

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
        })
        .finally(() => setLoading(false));
      getSpheresByUser(user._id);
    }
  }, [user, getAllCommissionsByUserId]);

  const calculateProgress = () => {
    if (apiData && apiData.levelInfo) {
      const totalPoints =
        apiData.levelInfo.nextLevel.start -
        apiData.levelInfo.currentLevel.start;
      const currentPointsString =
        apiData.userBalance.virtualCurrency.$numberDecimal;
      const currentPoints = currentPointsString
        ? parseFloat(currentPointsString)
        : 0;

      return (currentPoints / totalPoints) * 100;
    }
    return 0;
  };

  console.log("apiData ==>", apiData);

  function formatCountdown() {
    const now = moment();
    let targetDate = now.clone().startOf("day").hour(23).minute(0).second(0);

    if (now.isAfter(targetDate)) {
      targetDate.add(1, "month");
    }

    const diff = targetDate.diff(now);
    const duration = moment.duration(diff);

    function formatUnit(value: number, unit: string) {
      return `${value} ${unit}${value !== 1 ? "s" : ""}`;
    }

    const days = formatUnit(Math.floor(duration.asDays()), "Dia");
    const hours = formatUnit(duration.hours(), "Hora");
    const minutes = formatUnit(duration.minutes(), "Minuto");
    const seconds = formatUnit(duration.seconds(), "Segundo");

    return `${days}, ${hours}, ${minutes.padStart(2, "0")} e ${seconds.padStart(
      2,
      "0"
    )}`;
  }

  const formattedCountdown = formatCountdown();

  return (
    <>
      {" "}
      {!loading ? (
        <section className={styles.deshBoardPage}>
          <div className={styles.deshBoardPageAuff}>
            <h2>AUFFS Gerados</h2>

            <div className={styles.deshBoardPageAuffProgress}>
              <span>
                {apiData?.userBalance.virtualCurrency.$numberDecimal.toString()}
              </span>
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
                  <span>
                    {apiData!.userBalance.virtualCurrency.$numberDecimal.toString()}{" "}
                    Pontos Atuais
                  </span>
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
      ) : (
        <></>
      )}
    </>
  );
};

export default Dashboard;
