import axios from 'axios'
import { API_URL } from '../constants/env'

const api = axios.create({
  //baseURL: API_URL,
  baseURL: 'http://localhost:4001',
})

export default api
