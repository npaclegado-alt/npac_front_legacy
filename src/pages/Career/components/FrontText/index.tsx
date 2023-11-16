import styles from '../../career.module.scss'

type FrontTextProps = {
    title: string;
    AA: number;
    AG: number;
    borderRight?: boolean;
}


export const FrontText = ({ title, AA, AG, borderRight }: FrontTextProps) => {
    return (
        <>
            <div className={styles.careerPageAgentfrontItem}>
                <h4>{title}</h4>
                <ul>
                    <li>{AG} <span>AG</span></li>
                    <li>{AA} <span>AA</span></li>
                </ul>
            </div>
            {
                borderRight && <div className={styles.careerPageAgentfrontBorder} />

            }
        </>

    )

}

