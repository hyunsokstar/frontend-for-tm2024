import axios, { AxiosResponse } from "axios";
import { backendApi } from "./commonApi";
import { QueryFunctionContext } from "@tanstack/react-query";
import { IParamterTypeForLogin } from "@/types/typeForAuthentication";
import { IUser } from "@/types/typeForUserBoard";

const instance = axios.create({
    baseURL: `${backendApi}/users`,
    withCredentials: true,
});