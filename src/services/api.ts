import axios from "axios";

//serviço de dados

export const api = axios.create( {
    baseURL: "http://localhost:3000/api",
} )