import api from "../api";

export async function getCommissionsByUserId(userId: string) {
  return new Promise((resolve, reject) => {
    api
      .get(`commission/${userId}`)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
