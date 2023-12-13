import { AddCrudProduct, EditCrudProduct } from "../../contexts";
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

export async function addProduct(product: AddCrudProduct) {
  return new Promise((resolve, reject) => {
    const {
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
      digitalProduct,
      freeShipping,
      recurrence,
      isCademi,
      cademiKey
    } = product;
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
        digitalProduct,
        freeShipping,
        recurrence,
        isCademi,
        cademiKey
      })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export async function editProduct(product: EditCrudProduct) {
  return new Promise((resolve, reject) => {
    const {
      id,
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
      digitalProduct,
      freeShipping,
      recurrence,
      isCademi,
      cademiKey
    } = product;
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
        digitalProduct,
        freeShipping,
        recurrence,
        isCademi,
        cademiKey
      })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
