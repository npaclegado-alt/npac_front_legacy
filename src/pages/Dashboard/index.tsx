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
      amountToNextLevel: string;
    };
  };
  total: number;
  month: number;
};

const Dashboard: React.FC = () => {
  const { user, spheresResp, getAllCommissionsByUserId, getSpheresByUser } =
    useContext(ContextApi);
  const children = useExtractChildren(spheresResp?.rootNode);
  const [apiData, setApiData] = useState<MainScreemData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      getAllCommissionsByUserId(user._id);
    }
  }, [user, getAllCommissionsByUserId]);

  useEffect(() => {
    if (user) {
      mainScreemDetails(user._id)
        .then((response: any) => {
          setApiData(response.data as any);
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
        apiData?.userBalance?.virtualCurrency?.toString();
      const currentPoints = currentPointsString
        ? parseFloat(currentPointsString)
        : 0;

      return (currentPoints / totalPoints) * 100;
    }
    return 0;
  };
  function formatCountdown() {
    const now = moment();
    let targetDate = now.clone().startOf("month").add(8, "days");
    if (now.isAfter(targetDate)) {
      targetDate.add(1, "month");
    }

    const diff = targetDate.diff(now);
    const duration = moment.duration(diff);

    const days = Math.floor(duration.asDays());
    const hours = duration.hours();
    const minutes = duration.minutes();

    return `${days} dias, ${hours} horas e ${minutes} minutos`;
  }

  const formattedCountdown = formatCountdown();

  return (
    <>
      {" "}
      {!loading ? (
        <section className={styles.deshBoardPage}>
          <div className={styles.deshBoardPageAuff}>
            <div className={styles.deshBoardPageTotals}>
              <div className={styles.deshBoardPageTotalsInfomation}>
                <div className={styles.deshBoardPageTotalsItem}>
                  <h4>Lucro Disponível</h4>
                  <span>
                    {Filters.convertMoneyTextMask(apiData?.userBalance?.money)}
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
