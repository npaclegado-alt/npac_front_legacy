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
  createUser: boolean,
  commissionDistributionSpheres: number[],
  commissionDistributionGroup: number[],
  commissionDistributionCarrer: number[],
  commissionType: string,
  shippingValues: {
    width: number;
    height: number;
    length: number;
    weight: number;
  },
  isCommissionable: boolean,
  directCommissionValue?: number
) {
  return new Promise((resolve, reject) => {
    api
      .post("products", {
        name,
        description,
        price,
        auff,
        createUser,
        commissionDistributionSpheres,
        commissionDistributionGroup,
        commissionDistributionCarrer,
        commissionType,
        shippingValues,
        isCommissionable,
        directCommissionValue,
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
  id: string,
  name: string,
  description: string,
  price: number,
  auff: number,
  createUser: boolean,
  commissionDistributionSpheres: number[],
  commissionDistributionGroup: number[],
  commissionDistributionCarrer: number[],
  commissionType: string,
  shippingValues: {
    width: number;
    height: number;
    length: number;
    weight: number;
  },
  isCommissionable: boolean,
  directCommissionValue?: number
) {
  return new Promise((resolve, reject) => {
    api
      .put(`products/${id}`, {
        name,
        description,
        price,
        auff,
        createUser,
        commissionDistributionSpheres,
        commissionDistributionGroup,
        commissionDistributionCarrer,
        commissionType,
        shippingValues,
        isCommissionable,
        directCommissionValue,
      })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
