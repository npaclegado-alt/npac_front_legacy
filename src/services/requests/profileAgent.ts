import api from "../api"
import { User } from '../../types/user'


const profileAgent = async (id: string,  data: User) => {
    return new Promise ((resolve, reject) => {
        api.put(`/user/${id}`, data)
        .then((response) => {
            resolve(response)
        }).catch((error) => {
            reject(error)
        })
    })
}

export { profileAgent }