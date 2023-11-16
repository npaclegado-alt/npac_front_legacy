import { useContext, useEffect } from "react";
import styles from "./career.module.scss";
import { ContextApi } from "../../contexts";
import { FrontText } from "./components/FrontText";
import { AuffText } from "./components/AuffText";

const Career = () => {
  const { user, getAllCareer, career } = useContext(ContextApi);

  useEffect(() => {
    getAllCareer();
  }, [getAllCareer]);

  //TODO: Os dados Auffs Pessoais e Total de Auffs não estão sendo retornado
  return (
    <>
      {career && (
        <section className={styles.careerPage}>
          <div className={styles.careerPageAgentData}>
            <div className={styles.careerPageAgentTitle}>
              <h2>{user?.name}</h2>
              <span>#102030AZ</span>
            </div>

            <div className={styles.careerPageAgentfront}>
              <FrontText
                title="Frente 1"
                AA={career.front1.AA}
                AG={career.front1.AG}
                borderRight={true}
              />
              <FrontText
                title="Frente 2"
                AA={career.front2.AA}
                AG={career.front2.AG}
                borderRight={true}
              />
              <FrontText
                title="Frente 3"
                AA={career.front3.AA}
                AG={career.front3.AG}
                borderRight={true}
              />
              <FrontText
                title="Frente 4"
                AA={career.front4.AA}
                AG={career.front4.AG}
                borderRight={true}
              />
              <FrontText
                title="Outras Frentes"
                AA={career.otherFronts.AA}
                AG={career.otherFronts.AG}
              />
            </div>

            <div className={styles.careerPageAgentInformation}>
              <AuffText
                title="AG"
                text="Auffs Gerados"
                auff={career.generatedAuffs}
              />
              <div className={styles.careerPageAgentfrontBorder} />
              <AuffText
                title="AA"
                text="Auffs Aproveitados"
                auff={career.utilizedAuffs}
              />
            </div>
          </div>
          <div className={styles.careerPageCommonAgent}>
            <div className={styles.careerPageCommonAgentText}>
              <h4>
                Nivel de{" "}
                {career.careerLevel.charAt(0) +
                  career.careerLevel
                    .substring(1, career.careerLevel.length - 1)
                    .toLowerCase()}
              </h4>
              <h5>Agente Comum</h5>
              <span>{career.careerPoints} Pontos Atuais</span>
            </div>
            <p>
              <strong>Próximo Nível</strong> Agente Premium ao atingir
              <span> 1000 pontos..</span>
            </p>
          </div>
          <div className={styles.careerPageAufssPersonal}>
            <h4>
              Auffs Pessoais <span>5.000,00</span>
            </h4>
          </div>
          <div className={styles.careerPageAufssTotal}>
            <h4>
              Total de Auffs <span>5.000,00</span>
            </h4>
            <button type="button" />
          </div>
        </section>
      )}
    </>
  );
};

export default Career;
