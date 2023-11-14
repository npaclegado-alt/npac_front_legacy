import api from "../api"

export async function getSpheres(idUser: string | undefined) {
    return new Promise ((resolve, reject) => {
        api.get(`sphere/${idUser}`)
        .then((response) => {
            resolve(response)
        }).catch((error) => {
            reject(error)
        })
    })
}