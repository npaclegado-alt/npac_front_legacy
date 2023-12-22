import api from "../api";

export async function getUsers() {
  return new Promise((resolve, reject) => {
    api
      .get("user/all")
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
