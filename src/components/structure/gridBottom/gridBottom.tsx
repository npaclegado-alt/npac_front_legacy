import { 
    useContext, 
    useEffect, 
    useState
} from 'react';
import { 
    FileText,
    XSquare
 } from 'lucide-react';

import styles from './styleGridBottom.module.scss';
import { Flow } from '../componentFlow/componentFlow';
import { ContextApi } from '../../../contexts';
import { useExtractChildren } from '../../../hooks/useExtractChildren';
import { CustomButton } from '../../buttons/customButton';
import { useNavigate } from 'react-router-dom';

export function GridButtom(): JSX.Element {
    const navigation = useNavigate();
    const [fullFlow, setFullFlow] = useState(false);
    const {
        getSpheresByUser,
        spheresResp,
        user
    } = useContext(ContextApi);
      
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
    
    useEffect(() => {
        const userId: string | any = user?._id;
        getSpheresByUser(userId);
    }, []);

    const changeFullFlow = () => {
        setFullFlow(!fullFlow);
    }
    
    const children = useExtractChildren(spheresResp);

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
            <div 
                style={{
                    width: fullFlow ? window.innerWidth * 0.75 : '100%',
                    height: fullFlow ? '82%' : '100%',
                    position: fullFlow ? 'fixed' : 'initial',
                    bottom: fullFlow ? '1.5rem' : 'initial',
                    right: fullFlow ? '2.5rem' : 'initial',
                    left: fullFlow ? 'initial' : 'initial',
                    padding: fullFlow ? '1rem' : 'initial',
                    backgroundColor: '#fff',
                    borderRadius: '0.45rem',
                }}
            >
                <div
                    style={{
                        position: 'absolute',
                        right: '1.5rem',
                        top: '1.5rem',
                        zIndex: 99,
                        display: 'flex',
                        alignItems: 'center',
                        boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.75)',
                        justifyContent: 'flex-end',
                        backgroundColor: '#fff',
                        borderRadius: '0.35rem',
                        padding: '0.13rem',
                        cursor: 'pointer',
                    }}
                    onClick={() => changeFullFlow()}
                >
                    <XSquare />
                </div>
                <Flow 
                    children={children ?? []}
                    fullFlow={fullFlow}
                />
            </div>
            <CustomButton
                style={{
                    width: '100%',
                    marginTop: '1rem',
                }}
                onClick={() => changeFullFlow()}
            >
                Ver Estrutura Completa
            </CustomButton>
        </div>
    </div>
  );
};
            
