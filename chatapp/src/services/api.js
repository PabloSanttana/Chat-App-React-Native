import axios from 'axios'
import localhost from './localhost'
const api = axios.create({
    baseURL: localhost.url
})

export default api