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

export async function getProductImages(id: string) {
  return new Promise((resolve, reject) => {
    api
      .get(`files/search/filters?fieldName=productImages&fieldId=${id}`)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export async function deleteFile(name: string) {
  return new Promise((resolve, reject) => {
    api
      .delete(`files/${name}`)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export async function getDocuments() {
  return new Promise((resolve, reject) => {
    api
      .get(`files/search/documents/general`)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export async function getDocumentById(documentId: string) {
  return new Promise((resolve, reject) => {
    api
      .get(`files/search/filters?fieldName=document&fieldId=${documentId}`)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export async function addDocument(
  name: string,
  description: string,
  file: File,
  uploadedBy: string
) {
  return new Promise((resolve, reject) => {
    const form = new FormData();
    form.append("document", file);

    api
      .post(
        `files/upload/document?documentType=GENERAL&name=${name}&description=${description}&uploadedBy=${uploadedBy}`,
        form
      )
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
