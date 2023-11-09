import api from "../api"

export async function getSpheres(idUser: string | undefined) {
    return new Promise ((resolve, reject) => {
        console.log('idUser', idUser)
        api.get(`sphere/${idUser}`)
        .then((response) => {
            console.log('response', response)
            resolve(response)
        }).catch((error) => {
            reject(error)
        })
    })
}