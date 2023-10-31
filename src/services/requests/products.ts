import api from "../api"

export async function getProducts(config: Object) {
    return new Promise ((resolve, reject) => {
        api.get('products', config)
        .then((response) => {
            resolve(response)
        }).catch((error) => {
            reject(error)
        })
    })
}

export async function getProductById(id: string, config: Object) {
    return new Promise ((resolve, reject) => {
        api.get(`products/${id}`, config)
        .then((response) => {
            resolve(response)
        }).catch((error) => {
            reject(error)
        })
    })
}