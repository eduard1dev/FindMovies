import axios from 'axios'

const Api = axios.create({
    baseURL: 'https://api.themoviedb.org'
})

export default Api