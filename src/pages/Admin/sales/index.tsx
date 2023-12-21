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
                        Quantidade vendido
                    </strong>
                </div>
                <div>
                    <strong>
                        Valor unitario
                    </strong>
                </div>
                <div>
                    <strong>
                        Valor total em vendas
                    </strong>
                </div>
                <div>
                    <strong>
                        Periodo em dias
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