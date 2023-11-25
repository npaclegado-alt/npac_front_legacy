import api from "../api";

export async function getFaq() {
    return new Promise((resolve, reject) => {
      api
        .get("/faq")
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  