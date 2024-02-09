import axios, { AxiosResponse } from "axios";
import { backendApi } from "./commonApi";
import { QueryFunctionContext } from "@tanstack/react-query";
import { access } from "fs";

const instance = axios.create({
    baseURL: `${backendApi}/cloudflare`,
    withCredentials: true,
});


instance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem('accessToken');
        // console.log("access token 유무 확인 : ", accessToken);

        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        alert("여기서 막았나?")
        return Promise.reject(error);
    }
);

// get-upload-url
export const apiForGetUrlForImageUpload = () =>
    instance
        .post(`get-upload-url`, null, {
        })
        .then((response) => response.data);

export const apiForUploadToCloudFlare = async ({ file, uploadURL }: any) => {

    const form = new FormData();
    form.append("file", file);

    if (file && uploadURL) {
        try {
            const response = await axios.post(uploadURL, form, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            return response.data;

        } catch (error) {
            console.log("error 1 : ", error);

            return Promise.reject(error);
        }

    } else {
        alert("파일 혹은 url이 없습니다 ! ");
        return axios
            .post(uploadURL, form, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((response) => response.data);
    }
};        