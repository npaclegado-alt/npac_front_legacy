import api from "../api"

export async function adressByPostalCode(postalCode:string, config:any) {
    return new Promise ((resolve, reject) => {
        api.get(`/postal-code/location/${postalCode}`, config)
        .then((response) => {
            resolve(response)
        }).catch((error) => {
            reject(error)
        })
    })
}

export async function states(idState?: string, config?:any) {
    return new Promise ((resolve, reject) => {
        api.get(`/postal-code/${idState ? 'state/' + idState : 'states'}`, config)
        .then((response) => {
            resolve(response)
        }).catch((error) => {
            reject(error)
        })
    })
}

export async function citiesByState(ufId:string, config:any) {
    return new Promise ((resolve, reject) => {
        api.get(`/postal-code/city/${ufId}`, config)
        .then((response) => {
            resolve(response)
        }).catch((error) => {
            reject(error)
        })
    })
}