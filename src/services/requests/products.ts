import api from "../api";

export async function getProducts() {
  return new Promise((resolve, reject) => {
    api
      .get("products")
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export async function getProductById(id: string) {
  return new Promise((resolve, reject) => {
    api
      .get(`products/${id}`)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export async function deleteProduct(id: string) {
  return new Promise((resolve, reject) => {
    api
      .delete(`products/${id}`)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export async function addProduct(
  name: string,
  description: string,
  price: number,
  auff: number,
  isCommissionable: boolean,
  commissionType?: string
) {
  return new Promise((resolve, reject) => {
    api
      .post("products", {
        name,
        description,
        price,
        auff,
        isCommissionable,
        commissionType,
      })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export async function editProduct(
  name: string,
  description: string,
  price: number,
  imageUrls: string[]
) {
  return new Promise((resolve, reject) => {
    api
      .post("products", { name, description, price, imageUrls })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
