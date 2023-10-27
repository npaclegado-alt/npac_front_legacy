import { Files } from 'lucide-react';

import { Divider } from '../divider';

import TenisImage from '../../assets/images/tenisStore.jpg';

import styles from './styleProduct.module.scss';

interface ProductsProps {
    key: number;
    name: string;
    value: number;
    auffs: number;
    image: string;
    link: string;
}
export function Products({
    key,
    name,
    value,
    auffs,
    image,
    link
}: ProductsProps): JSX.Element {
    return (
        <div 
            className={styles.contentProduct}
            key={key}
        >
            <div className={styles.boxHeaderProduct}>
                <h4>{name}</h4>
                <div className={styles.boxValue}>
                    <p>R$19,90</p>
                    <p>100 Auffs</p>
                </div>
            </div>
            <div className={styles.boxImage}>
                <img src={TenisImage} alt="Tenis Nike" />
            </div>
            <Divider />
            <div className={styles.boxLink}>
                <Files />
                <p>Link da oferta</p>
            </div>
        </div>
    );
}