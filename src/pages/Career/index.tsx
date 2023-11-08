import { useContext, useEffect } from 'react'
import styles from './career.module.scss'
import { ContextApi } from '../../contexts'

const Career = () => {

    const { user, getAllCareer, career } = useContext(ContextApi)

    async function getRequestCareer() {
        await getAllCareer("65456fc6f35b5feca1f1d629")
    }

    useEffect(() => {
        getRequestCareer()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const careerData = Object.keys(career).length > 0
    return (
        <>

            {
                careerData && <section className={styles.careerPage}>
                    <div className={styles.careerPageAgentData}>
                        <div className={styles.careerPageAgentTitle}>
                            <h2>{user?.name}</h2>
                            <span>#102030AZ</span>
                        </div>

                        <div className={styles.careerPageAgentfront}>
                            <div className={styles.careerPageAgentfrontItem}>
                                <h4>Frente 1</h4>
                                <ul>
                                    <li>{career.front1.AG} <span>AG</span></li>
                                    <li>{career.front1.AA} <span>AA</span></li>
                                </ul>
                            </div>
                            <div className={styles.careerPageAgentfrontBorder} />
                            <div className={styles.careerPageAgentfrontItem}>
                                <h4>Frente 2</h4>
                                <ul>
                                    <li>{career.front2.AG} <span>AG</span></li>
                                    <li>{career.front2.AA} <span>AA</span></li>
                                </ul>
                            </div>
                            <div className={styles.careerPageAgentfrontBorder} />

                            <div className={styles.careerPageAgentfrontItem}>
                                <h4>Frente 3</h4>
                                <ul>
                                    <li>{career.front3.AA} <span>AG</span></li>
                                    <li>{career.front3.AG} <span>AA</span></li>
                                </ul>
                            </div>
                            <div className={styles.careerPageAgentfrontBorder} />
                            <div className={styles.careerPageAgentfrontItem}>
                                <h4>Frente 4</h4>
                                <ul>
                                    <li>{career.front4.AG} <span>AG</span></li>
                                    <li>{career.front4.AA} <span>AA</span></li>
                                </ul>
                            </div>
                            <div className={styles.careerPageAgentfrontBorder} />
                            <div className={styles.careerPageAgentfrontItem}>
                                <h4>Outras Frentes</h4>
                                <ul>
                                    <li>{career.otherFronts.AG} <span>AG</span></li>
                                    <li>{career.otherFronts.AA} <span>AA</span></li>
                                </ul>
                            </div>
                        </div>

                        <div className={styles.careerPageAgentInformation}>
                            <div className={styles.careerPageAgentInformationItem}>
                                <h5>AG</h5>
                                <div className={styles.careerPageAgentInformationDescriptionItem}>
                                    <span>Auffs Gerados</span>
                                    <span>{career.generatedAuffs} Pontos Totais</span>
                                </div>
                            </div>
                            <div className={styles.careerPageAgentfrontBorder} />

                            <div className={styles.careerPageAgentInformationItem}>
                                <h5>AA</h5>
                                <div className={styles.careerPageAgentInformationDescriptionItem}>
                                    <span>Auffs Aproveitados</span>
                                    <span>{career.utilizedAuffs} Pontos Totais</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.careerPageCommonAgent}>
                        <div className={styles.careerPageCommonAgentText}>
                            <h4>Nivel de {career.careerLevel.charAt(0) + career.careerLevel.substring(1, career.careerLevel.length - 1).toLowerCase()}</h4>
                            <h5>Agente Comum</h5>
                            <span>{career.careerPoints} Pontos Atuais</span>
                        </div>
                        <p><strong>Próximo Nível</strong> Agente Premium ao atingir<span> 1000 pontos..</span></p>
                    </div>
                    <div className={styles.careerPageAufssPersonal}>
                        <h4>Auffs Pessoais <span>5.000,00</span></h4>
                    </div>
                    <div className={styles.careerPageAufssTotal}>
                        <h4>Total de Auffs <span>5.000,00</span></h4>
                        <button type='button' />
                    </div>
                </section>
            }


        </>
    )
}

export default Career