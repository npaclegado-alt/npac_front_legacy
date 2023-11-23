import { 
    useState, 
    useContext
} from "react";
import { Files, CopyCheck } from "lucide-react";


import { CopyToClipboard } from "react-copy-to-clipboard";

import { Divider } from "../divider";
import { ContextApi } from "../../contexts";

import styles from "./styleProduct.module.scss";
import Filters from "../../libs/Filters";

interface ProductsProps {
    key: string;
    name: string;
    value: number;
    auffs: number;
    image: string;
    link: string;
}
export function Products({
  name,
  value,
  auffs,
  image,
  link,
  key
}: ProductsProps): JSX.Element {
    const location = window.location.href.split('/');
    const {
        user
      } = useContext(ContextApi);

    const salesIdentify = {
        userId: user?._id,
        productId: link,
    };

    const criptoIdentify = btoa(JSON.stringify(salesIdentify));

    const redirectUrlProductsDetails = location[0] + '//' + location[2] + '/productDetails/' + criptoIdentify;

    const [copied, setCopied] = useState<boolean>(false);

    return (
        <div 
            className={styles.contentProduct}
            key={key}
        >
            <a
                href={redirectUrlProductsDetails}
                target="_blank"
            >
                <div className={styles.boxHeaderProduct}>
                    <h4>{name}</h4>
                    <div className={styles.boxValue}>
                        <p>{Filters.convertMoneyTextMask(value)}</p>
                        <p>{auffs} Auffs</p>
                    </div>
                </div>
                <div className={styles.boxImage}>
                    <img src={image} alt="Tenis Nike" />
                </div>
            </a>
            <Divider />
            <div className={styles.boxLink}>
                {copied ? 
                <CopyCheck style={{
                    color: '#00ff00',
                }}/> : 
                <Files />}
                <CopyToClipboard
                    text={redirectUrlProductsDetails}
                    onCopy={(copy) => {
                        setCopied(true);
                        setTimeout(() => {
                            setCopied(false);
                        }, 2000);
                    }}
                >
                    <p>Link da oferta</p>
                </CopyToClipboard>
            </div>
    </div>
  );
}
