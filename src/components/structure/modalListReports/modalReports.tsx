import { Modal } from "antd";
import { FileDown } from 'lucide-react';

import { LineUserReport } from "./lineUserReport";
import { CustomButton } from "../../buttons/customButton";

import styles from './styleModal.module.scss';
export function ModalReports(): JSX.Element {

    const reportsMock = [
        {
            id: '#102030AZ',
            name: 'João',
            email: 'joao@email.com',
            phone: 11999999999
        },
        {
            id: '#102030AZ',
            name: 'Maria',
            email: 'maria@email.com',
            phone: 11999999999
        },
        {
            id: '#102030AZ',
            name: 'José',
            email: 'jose@email.com',
            phone: 11999999999
        },
        {
            id: '#102030AZ',
            name: 'João da Silva',
            email: 'joaosilva@email.com',
            phone: 11999999999
        },
        {
            id: '#102030AZ',
            name: 'Maria da Silva',
            email: 'mariasilva@email.com',
            phone: 11999999999
        },
    ]
    
    return (
        <Modal
            open={true}
            onOk={() => { }}
            onCancel={() => { }}
            okButtonProps={{
                style: {
                    display: 'none'
                }
            }}
            cancelButtonProps={{ 
                style: {
                    display: 'none'
                }
             }}
             style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
             }}        
        >
            <div className={styles.header}>
                <h1>
                    Relatório de Parceiros 1ª Esfera
                </h1>
            </div>
            <div className={styles.table}>
                <div className={styles.hheadTable}>
                    <div>
                        <p>
                            ID
                        </p>
                    </div>
                    <div className={styles.boxHeadName}>
                        <p>
                            Nome
                        </p>
                        <div className={styles.arrowDown}></div>
                    </div>
                    <div>
                        <p>
                            Email
                        </p>
                    </div>
                    <div>
                        <p>
                            Telefone
                        </p>
                    </div>
                </div>
                {reportsMock.map((report) => {
                    return (
                        <LineUserReport
                            report={report}
                        />
                    )
                })}
                <div className={styles.boxButton}>
                    <CustomButton
                        style={{
                            width: '100%',
                            height: '30px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        Voltar Para o Dashboard
                    </CustomButton>
                    <div className={styles.contentButtonDownload}>
                        <p>
                            Quer guardar esse relatório em seu dispositivo?
                        </p>
                        <span>
                            Baixe o PDF clicando aqui
                            <FileDown size={13} />
                        </span>
                    </div>
                </div>
            </div>
        </Modal>
    )
}