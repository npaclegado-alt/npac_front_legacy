import styles from './career.module.scss'

const Career = () => {
    return (
        <section className={styles.careerPage}>
            <div className={styles.careerPageAgentData}>
                <div className={styles.careerPageAgentTitle}>
                    <h2>Davi Carlos Rodrigues</h2>
                    <span>#102030AZ</span>
                </div>

                <div className={styles.careerPageAgentfront}>
                    <div className={styles.careerPageAgentfrontItem}>
                        <h4>Frente 1</h4>
                        <ul>
                            <li>10.000,00 <span>AG</span></li>
                            <li>10.000,00 <span>AA</span></li>
                        </ul>
                    </div>
                    <div className={styles.careerPageAgentfrontBorder} />
                    <div className={styles.careerPageAgentfrontItem}>
                        <h4>Frente 2</h4>
                        <ul>
                            <li>10.000,00 <span>AG</span></li>
                            <li>10.000,00 <span>AA</span></li>
                        </ul>
                    </div>
                    <div className={styles.careerPageAgentfrontBorder} />

                    <div className={styles.careerPageAgentfrontItem}>
                        <h4>Frente 3</h4>
                        <ul>
                            <li>10.000,00 <span>AG</span></li>
                            <li>10.000,00 <span>AA</span></li>
                        </ul>
                    </div>
                    <div className={styles.careerPageAgentfrontBorder} />
                    <div className={styles.careerPageAgentfrontItem}>
                        <h4>Frente 4</h4>
                        <ul>
                            <li>10.000,00 <span>AG</span></li>
                            <li>10.000,00 <span>AA</span></li>
                        </ul>
                    </div>
                    <div className={styles.careerPageAgentfrontBorder} />
                    <div className={styles.careerPageAgentfrontItem}>
                        <h4>Outras Frentes</h4>
                        <ul>
                            <li>10.000,00 <span>AG</span></li>
                            <li>10.000,00 <span>AA</span></li>
                        </ul>
                    </div>
                </div>

                <div className={styles.careerPageAgentInformation}>
                    <div className={styles.careerPageAgentInformationItem}>
                        <h5>AG</h5>
                        <div className={styles.careerPageAgentInformationDescriptionItem}>
                            <span>Auffs Gerados</span>
                            <span>50.000,00 Pontos Totais</span>
                        </div>
                    </div>
                    <div className={styles.careerPageAgentfrontBorder} />

                    <div className={styles.careerPageAgentInformationItem}>
                        <h5>AA</h5>
                        <div className={styles.careerPageAgentInformationDescriptionItem}>
                            <span>Auffs Aproveitados</span>
                            <span>50.000,00 Pontos Totais</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.careerPageCommonAgent}>
                <div className={styles.careerPageCommonAgentText}>
                    <h4>Nivel de Carreira</h4>
                    <h5>Agente Comum</h5>
                    <span>850 Pontos Atuais</span>
                </div>
                <p><strong>Próximo Nível</strong> Agente Premium ao atingir<span> 1000 pontos..</span></p>
            </div>
            <div className={styles.careerPageAufssPersonal}>
                <h4>Auffs Pessoais <span>5.000,00</span></h4>
            </div>
            <div className={styles.careerPageAufssTotal}>
                <h4>Total de Auffs <span>5.000,00</span></h4> 
                <button type='button'/>
            </div>
        </section>
    )
}

export default Career