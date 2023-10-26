import api from "../api"

const login = async (email:string, password:string) => {
    return new Promise ((resolve, reject) => {
        api.post('auth', { email, password })
        .then((response) => {
            resolve(response)
        }).catch((error) => {
            reject(error)
        })
    })
}

export { login }