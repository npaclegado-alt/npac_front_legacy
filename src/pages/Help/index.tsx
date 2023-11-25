import styles from './help.module.scss'
import { CaretRightOutlined } from '@ant-design/icons';
import { Collapse } from 'antd';
import { useContext, useEffect } from 'react';
import { ContextApi } from '../../contexts';


export const Help = () => {

    const { getAllFaq, allFaq } = useContext(ContextApi)

    useEffect(() => {
        getAllFaq()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    return (
        <section className={styles.helpPage}>
            <div className={styles.commonQuestions}>
                <h2>Perguntas Frequentes</h2>
                <p>Aqui nesta seção está uma lista de perguntas frequentes com suas respostas em relação ao nosso sistema.
                    Caso você precise de um suporte mais especifico, você pode entrar em contato com nosso suporte através
                    do e-mail <span>suporte@planonpac.com.br</span> ou clicando no chatbox no canto inferior direito da tela.</p>
            </div>
            <div className={styles.support}>
                <Collapse items={allFaq?.map((faq) => {
                    return {
                        key: faq.position.toString(),
                        label: <h3>{faq.question}</h3>,
                        children: <p>{faq.answer}</p>
                    }
                })}
                    size='middle'
                    expandIconPosition="end" 
                    expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                />

            </div>
        </section>
    )
}