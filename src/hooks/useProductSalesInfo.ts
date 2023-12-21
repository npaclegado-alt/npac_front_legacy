import { useEffect, useState } from "react";
import { IApiResponseTransactions } from "../contexts/interfaceTransactions";

export interface ProductSalesInfo {
    productId: string;
    productName: string;
    totalQuantity: number;
    unitPrice: number;
    totalValue: number;
    firstSaleDate: string;
    lastSaleDate: string;
  }
  
  export const useProductSalesInfo = (apiResponse: IApiResponseTransactions[] | null) => {
    const [productSalesInfo, setProductSalesInfo] = useState<ProductSalesInfo[] | null>(null);
  
    useEffect(() => {
      if (apiResponse) {
        const productsMap: Map<string, ProductSalesInfo> = new Map();
  
        apiResponse.forEach((transaction) => {
          transaction.items.forEach((item) => {
            const productId = item.code;
            const productName = item.description;
            const quantity = item.quantity;
            const unitPrice = item.amount / quantity;
            const totalValue = item.amount;
            const saleDate = transaction.created_at;
  
            if (!productsMap.has(productId)) {
              productsMap.set(productId, {
                productId,
                productName,
                totalQuantity: 0,
                unitPrice,
                totalValue: 0,
                firstSaleDate: saleDate,
                lastSaleDate: saleDate,
              });
            }
  
            const productInfo = productsMap.get(productId);
  
            if (productInfo) {
              productInfo.totalQuantity += quantity;
              productInfo.totalValue += totalValue;
  
              if (saleDate < productInfo.firstSaleDate) {
                productInfo.firstSaleDate = saleDate;
              }
  
              if (saleDate > productInfo.lastSaleDate) {
                productInfo.lastSaleDate = saleDate;
              }
            }
          });
        });
  
        setProductSalesInfo(Array.from(productsMap.values()));
      }
    }, [apiResponse]);
  
    return productSalesInfo;
  };