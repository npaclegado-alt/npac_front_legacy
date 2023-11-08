import api from "../api"

export async function getCareer(id: string) {
   return new Promise((resolve, reject) => {
    api.get(`career/${id}`)
    .then((response) => {
        resolve(response)
    }).catch((error) => {
        reject(error)
    })
   })    
}