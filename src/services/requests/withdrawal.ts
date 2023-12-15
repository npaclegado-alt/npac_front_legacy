import api from "../api";

export type IWithdrawal = {
  _id?: string;
  amount: number;
  method: string;
  pixKey?: string;
  status?: string;
  createdAt?: string;
  userId?: any;
};

export async function withdrawal(payload: IWithdrawal) {
  return new Promise((resolve, reject) => {
    api
      .post("/withdrawal", payload)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export async function getWithdrawal() {
  return new Promise((resolve, reject) => {
    api
      .get("/withdrawal/pending")
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export async function processWithdrawal(id: string, payload: IWithdrawal) {
  return new Promise((resolve, reject) => {
    api
      .put(`/withdrawal/${id}`, payload)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
