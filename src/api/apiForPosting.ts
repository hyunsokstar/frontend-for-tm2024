import axios, { AxiosResponse } from "axios";
import { backendApi } from "./commonApi";
import { QueryFunctionContext } from "@tanstack/react-query";

const instance = axios.create({
    baseURL: `${backendApi}/postings`,
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

// 1122
export const apiForCreatePost = ({
    userId,
    title,
    content,
}: any) => {
    console.log("userId : ", userId);
    console.log("title : ", title);
    console.log("content : ", content);

    return instance.post(
        '',
        {
            userId,
            title,
            content,
        }
    ).then((response: any) => response.data)
}

export const apiForGetAllUserPostings = ({ queryKey }: QueryFunctionContext) => {
    const [_, userId, pageNum] = queryKey;

    console.log("userId at api function : ", userId);

    return instance
        .get(`user/${userId}`, {
            params: { pageNum: pageNum },
        })
        .then((response) => {
            return response.data;
        });

};
