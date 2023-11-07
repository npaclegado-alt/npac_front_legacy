import React from 'react';
import { FileText } from 'lucide-react';

import styles from './styleGridBottom.module.scss';
import { Flow } from '../componentFlow/componentFlow';
export function GridButtom(): JSX.Element {
  
    const othersReports = [
        {
            id: 1,
            name: 'Diários',
            quantity: 30
        },
        {
            id: 2,
            name: 'Princípios',
            quantity: 20
        },
        {
            id: 3,
            name: 'Jornada',
            quantity: 20
        },
        {
            id: 4,
            name: 'Camisetas',
            quantity: 30
        },
        {
            id: 5,
            name: 'NPAC Box',
            quantity: 30
        },
        {
            id: 6,
            name: 'Escola',
            quantity: 30
        }
    ]

  return (
    <div className={styles.container}>
        <div className={styles.contentWhite}>
            <h1 className={styles.title}>
                Outros Relatórios
            </h1>
            <p className={styles.description}>
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam.
            </p>
            <div className={styles.boxOthersReports}>
                {othersReports.map((report) => (
                    <div key={report.id} className={styles.report}>
                        <span>
                            {report.name}
                        </span>
                        <p>
                            {report.quantity}
                            <FileText 
                                size={20}
                            />
                        </p>
                    </div>
                ))}
            </div>
        </div>
        <div className={styles.contentWhite}>
            <h1 className={styles.title}>
                Estrutura Completa
            </h1>
            <p className={styles.description}>
                Abra o nosso mapa com a estrutura completa de suas esferas, podendo acessar os detalhes de todos que estão fazendo parte.
            </p>
            <div className={styles.boxFlow}>
                <Flow />
            </div>
        </div>
    </div>
  );
};
            
