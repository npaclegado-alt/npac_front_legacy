import { FormattedData } from "../../pages/ProductsDetails/domain/Formatters";
import api from "../api";

export async function submitTransaction(payload: FormattedData) {
    const userId = '654c0a52ca8d1ae1c6532332';
    const url = `transactions/create/${userId}`;

    try {
        const response = await api.post(url, payload);
        return response.data;
    } catch (error) {
        throw error;
    }
}
