import api from "../api";

export async function mainScreemDetails(id: string) {
  return new Promise((resolve, reject) => {
    api
      .get(`/career/carrer-details/${id}`)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
