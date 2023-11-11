import api from "../api";

export async function uploadProductImage(id: string, productImages: File[]) {
  return new Promise((resolve, reject) => {
    const form = new FormData();
    productImages.forEach((file) => {
      form.append("productImages", file);
    });

    api
      .post(`files/upload/product?productId=${id}`, form)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
