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
import { ISalesByProduct } from '../../../contexts/interfaces';

interface GridButtomProps {
    othersReports: ISalesByProduct;
}

export function GridButtom({
    othersReports,
}: GridButtomProps): JSX.Element {
    const navigation = useNavigate();
    const [fullFlow, setFullFlow] = useState(false);
    const {
        getSpheresByUser,
        spheresResp,
        user
    } = useContext(ContextApi);
      
    
    useEffect(() => {
        const userId: string | any = user?._id;
        getSpheresByUser(userId);
    }, []);

    const changeFullFlow = () => {
        setFullFlow(!fullFlow);
    }
    
    const children = useExtractChildren(spheresResp?.rootNode);

  return (
    <div className={styles.container}>
        <div className={styles.contentWhite}>
            <h1 className={styles.title}>
                Outros Relatórios
            </h1>
            <p className={styles.description}>
                Acompanhe o volume de produtos ofertados em toda a sua estrutura e bata seus recordes, o mundo precisa de nós!
            </p>
            <div className={styles.boxOthersReports}>
                {othersReports && Object.entries(othersReports).map(([key, value]) => (
                    <div key={key} className={styles.report}>
                        <span>
                            {key}
                        </span>
                        <p>
                            {value}
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
            
