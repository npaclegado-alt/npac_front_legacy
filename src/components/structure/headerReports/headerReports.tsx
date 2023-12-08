import { FileText } from 'lucide-react';

import styles from './styleHeader.module.scss';

interface HeaderReportsProps {
    onChangeModal: (depth: number) => void;
    reports?: any[];
}
export function HeaderReports({
    onChangeModal,
    reports
}: HeaderReportsProps): JSX.Element {
    return (
        <div className={styles.containerHeader}>
            <div className={styles.boxReport}>
                <h2>
                    1ª Esfera
                </h2>
                <p>
                    Parceiros (as)
                </p>
                <div
                    onClick={() => { onChangeModal(1) }}
                >
                    <span>
                        {reports?.filter((report) => report.depth === 1).length}
                    </span>
                    <FileText />
                </div>
            </div>
            <div className={styles.boxReport}>
                <h2>
                    2ª Esfera
                </h2>
                <p>
                    Parceiros (as)
                </p>
                <div
                    onClick={() => { onChangeModal(2) }}
                >
                    <span>
                        {reports?.filter((report) => report.depth === 2).length}
                    </span>
                    <FileText />
                </div>
            </div>
            <div className={styles.boxReport}>
                <h2>
                    3ª Esfera
                </h2>
                <p>
                    Parceiros (as)
                </p>
                <div
                    onClick={() => { onChangeModal(3) }}
                >
                    <span>
                        {reports?.filter((report) => report.depth === 3).length}
                    </span>
                    <FileText />
                </div>
            </div>
        </div>
    )
}