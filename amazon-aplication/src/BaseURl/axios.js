import axios from 'axios'
const axiosInstant =   axios.create({
    // baseURL: "http://127.0.0.1:5001/clone-2825c/us-central1/api"
    baseURL:"https://amazon-api-deploy-v3vs.onrender.com/"
})

export {axiosInstant}