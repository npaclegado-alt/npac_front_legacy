import axios from 'axios'
import { API_URL } from '../constants/env'

const api = axios.create({
  baseURL: API_URL,
})

export default api
