import axios from 'axios';

export default axios.create({
    baseURL: "http://192.168.1.200:8000/api",
    timeout: 5000,
})
