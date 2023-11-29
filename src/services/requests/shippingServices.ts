import api from "../api"

export const calculateShipping = async (data: any) => {
  return new Promise((resolve, reject) => {
    api
      .post(`/postal-service/calculate-shipping`, {
        sCepOrigem: data.sCepOrigem,
        sCepDestino : data.sCepDestino,
        products: data.products,
      })
      .then((response) => {
        resolve(response)
      })
      .catch((error) => {
        reject(error)
      })
  })
}