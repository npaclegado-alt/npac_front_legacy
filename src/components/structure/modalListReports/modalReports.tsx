import { Modal } from "antd";
import { FileDown } from 'lucide-react';

import { LineUserReport } from "./lineUserReport";
import { CustomButton } from "../../buttons/customButton";

import styles from './styleModal.module.scss';
import { filter } from "lodash";

interface ModalReportsProps {
    changeModal: () => void;
    showModal: boolean;
    reports?: any[];
    depth?: number;
}

export function ModalReports({
    changeModal,
    showModal,
    reports,
    depth
}: ModalReportsProps): JSX.Element {
    
    return (
        <Modal
            open={showModal}
            onOk={() => { }}
            onCancel={() => { changeModal() }}
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
                {reports?.filter(filterReport => filterReport?.depth === depth).map((report) => {
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
                        onClick={() => { changeModal() }}
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