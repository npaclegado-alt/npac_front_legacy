import api from "../api"

export async function getProducts() {
    return new Promise ((resolve, reject) => {
        api.get('products')
        .then((response) => {
            resolve(response)
        }).catch((error) => {
            reject(error)
        })
    })
}

export async function getProductById(id: string) {
    return new Promise ((resolve, reject) => {
        api.get(`products/${id}`)
        .then((response) => {
            resolve(response)
        }).catch((error) => {
            reject(error)
        })
    })
}