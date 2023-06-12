import axios from "axios";

export const BASE_URL = "http://localhost:8000/api/"

export const BASE_API_URL = BASE_URL + "v1/"

const AUTH_TOKEN = "Token 5fc802c77d4b50f1a77d11621fe92d5b9c9740a4"
const applicationJson = "application/json"

const headers = {
    "Content-Type": applicationJson,
    "Authorization": AUTH_TOKEN
}

export const axiosInstance = axios.create({
    baseURL: BASE_API_URL,
    timeout: 5000,
    headers: headers
})