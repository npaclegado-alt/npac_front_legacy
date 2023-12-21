import { ProductSalesInfo } from '../../hooks/useProductSalesInfo';
import styles from './line.module.scss';
import Filters from '../../libs/Filters';

interface LineSaleProps {
    data: ProductSalesInfo;
}
export function LineSale({ data }: LineSaleProps): JSX.Element {

    const periodSales = (firstSaleDate: String, lastSaleDate: String) => {
        const firstDate = new Date(firstSaleDate.toString());
        const lastDate = new Date(lastSaleDate.toString());
        const diffTime = Math.abs(lastDate.getTime() - firstDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    }
    return (
        <div className={styles.contentLine}>
            <div 
                title={data?.productName ?? 'Nome do produto'}
            >
                <span>
                    <strong>{data?.productName}</strong>
                </span>
            </div>
            <div
                title={'Quantidade vendida'}
            >
                <span>
                    <strong>{data?.totalQuantity}</strong>
                </span>
            </div>
            <div
                title={'Valor unitário'}
            >
                <span>
                    <strong>{Filters.convertMoneyTextMask(data?.unitPrice / 100)}</strong>
                </span>
            </div>
            <div
                title={'Valor total da receita gerada'}
            >
                <span>
                    <strong>{Filters.convertMoneyTextMask(data?.totalValue / 100)}</strong>
                </span>
            </div>
            <div
                title={'Periodo de vendas'}
            >
                <span>
                    <strong>{periodSales(data?.firstSaleDate, data?.lastSaleDate)}</strong>
                </span>
            </div>
        </div>
    )
}