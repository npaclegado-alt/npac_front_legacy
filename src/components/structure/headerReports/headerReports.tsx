import { FileText } from 'lucide-react';

import styles from './styleHeader.module.scss';
export function HeaderReports(): JSX.Element {
    return (
        <div className={styles.containerHeader}>
            <div className={styles.boxReport}>
                <h2>
                    1ª Esfera
                </h2>
                <p>
                    Parceiros (as)
                </p>
                <div>
                    <span>
                        30
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
                <div>
                    <span>
                        20
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
                <div>
                    <span>
                        20
                    </span>
                    <FileText />
                </div>
            </div>
        </div>
    )
}