
import Filters from '../../../libs/Filters';
import styles from './styleLine.module.scss';

interface reportProps {
    report: {
        id: string,
        name: string,
        email: string,
        phone: number
    }
}

export function LineUserReport({
    report
}: reportProps): JSX.Element {
    return (
        <div className={styles.lineContainer}>
            <div>
                <p
                    title={report?.id}
                >
                    {report?.id}
                </p>
            </div>
            <div>
                <p
                    title={report?.name}
                >
                    {report?.name}
                </p>
            </div>
            <div>
                <p
                    title={report?.email}
                >
                    {report?.email}
                </p>
            </div>
            <div>
                <p
                    title={Filters.inputMaskTELWithDDD(report?.phone)}
                >
                    {Filters.inputMaskTELWithDDD(report?.phone)}
                </p>
            </div>
        </div>
    )
}