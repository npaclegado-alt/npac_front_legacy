import { useContext, useEffect } from "react";
import { ContextApi } from "../../../contexts";
import { LineSale } from "../../../components/sales/lineSale";
import { useProductSalesInfo } from "../../../hooks/useProductSalesInfo";

import styles from './sales.module.scss';

export default function SalesReports(): JSX.Element {
    const {
        listAllTransactions,
        allTransactions,
    } = useContext(ContextApi);

    useEffect(() => {
        listAllTransactions();
    }, []);

    const prodcutInfo = useProductSalesInfo(allTransactions);
    return (
        <div>
            <div className={styles.contentHeader}>
                <div>
                    <strong>
                        Produto
                    </strong>
                </div>
                <div>
                    <strong>
                        Qtda vendido
                    </strong>
                </div>
                <div>
                    <strong>
                        Valor unitário
                    </strong>
                </div>
                <div>
                    <strong>
                        Total em vendas
                    </strong>
                </div>
                <div>
                    <strong>
                        Periodo
                    </strong>
                </div>
            </div>
            {prodcutInfo?.map((transaction) => {
                return (
                    <LineSale 
                        data={transaction}
                    />
                )
            })}
        </div>
    )
}