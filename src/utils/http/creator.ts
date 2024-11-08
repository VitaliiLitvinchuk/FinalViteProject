import axios, { AxiosRequestConfig, CancelTokenSource } from "axios";

export const urlBackend = "http://localhost:4312";

export const bearer = (token: string, cancelToken?: CancelTokenSource) => {
    const config: AxiosRequestConfig = {
        baseURL: urlBackend,
        headers: {
            "Content-type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Authorization": `Bearer ${token}`
        },
        cancelToken: cancelToken?.token
    };
    return axios.create(config);
}

export default (cancelToken?: CancelTokenSource) => {
    const config: AxiosRequestConfig = {
        baseURL: urlBackend,
        headers: {
            "Content-type": "application/json",
            "Access-Control-Allow-Origin": "*",
        },
        cancelToken: cancelToken?.token
    };
    return axios.create(config);
};