import api from "../api";

export async function getCareer() {
  return new Promise((resolve, reject) => {
    api
      .get("career/user")
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
