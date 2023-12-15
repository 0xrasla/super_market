import axios from 'axios'
import { API_URL } from './Constants'

const instance = axios.create({
    baseURL: API_URL,
    withCredentials: true,
    headers : {
        'Access-Control-Allow-Origin': 'http://localhost:5173'
    }
}, )

export { instance as axios }