import styles from '../../career.module.scss'

type AuffTextProps = {
    auff: number;
    title: string;  
    text: string; 
}

export const AuffText = ({auff, title, text}: AuffTextProps) => {
    return (
        <div className={styles.careerPageAgentInformationItem}>
            <h5>{title}</h5>
            <div className={styles.careerPageAgentInformationDescriptionItem}>
                <span>{text}</span>
                <span>{auff} Pontos Totais</span>
            </div>
        </div>
    )


}