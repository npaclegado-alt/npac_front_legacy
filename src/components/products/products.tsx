import { useState } from "react";
import { Files, CopyCheck } from "lucide-react";

import { Divider } from "../divider";

import { CopyToClipboard } from "react-copy-to-clipboard";

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
}: ProductsProps): JSX.Element {
    const [copied, setCopied] = useState<boolean>(false);

    return (
        <div 
            className={styles.contentProduct}
            key={key}
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
            <Divider />
            <div className={styles.boxLink}>
                {copied ? 
                <CopyCheck style={{
                    color: '#00ff00',
                }}/> : 
                <Files />}
                <CopyToClipboard
                    text={`http://localhost:3000/productDetails/${link}`}
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
