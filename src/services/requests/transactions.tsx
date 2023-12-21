import { FormattedData } from "../../pages/ProductsDetails/domain/Formatters";
import { ProductDetailsContentProps } from "../../pages/ProductsDetails/domain/ProductDetailsContent";
import api from "../api";

export async function submitTransaction(
  payload: FormattedData,
  saleIdentification: ProductDetailsContentProps["saleIdentification"]
) {
  const decoderSaleIdentification = atob(saleIdentification);
  const userId =
    (JSON.parse(decoderSaleIdentification)?.userId as string) || "";
  const url = `transactions/create/${userId}`;

  try {
    const response = await api.post(url, payload);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getTransactionsByUserId(userId: string) {
  return new Promise((resolve, reject) => {
    api
      .get(`transactions/user/${userId}`)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export async function getAllTransactions() {
  return new Promise((resolve, reject) => {
    api
      .get(`transactions/`)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
