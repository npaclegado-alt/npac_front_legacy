import api from "../api"

export async function adressByPostalCode(postalCode:string) {
    return new Promise ((resolve, reject) => {
        api.get(`/postal-code/location/${postalCode}`)
        .then((response) => {
            resolve(response)
        }).catch((error) => {
            reject(error)
        })
    })
}

export async function states(idState?: string) {
    return new Promise ((resolve, reject) => {
        api.get(`/postal-code/${idState ? 'state/' + idState : 'states'}`)
        .then((response) => {
            resolve(response)
        }).catch((error) => {
            reject(error)
        })
    })
}

export async function citiesByState(ufId:string) {
    return new Promise ((resolve, reject) => {
        api.get(`/postal-code/city/${ufId}`)
        .then((response) => {
            resolve(response)
        }).catch((error) => {
            reject(error)
        })
    })
}