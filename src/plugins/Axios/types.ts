import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

export interface Config extends AxiosRequestConfig {
    authorization?: boolean;
    data?: any;
}

export interface Axios extends AxiosInstance {
    /* eslint-disable  @typescript-eslint/no-explicit-any */
    get<T = any, R = AxiosResponse<T>>(url: string, config?: Config): Promise<R>;
    post<T = any, R = AxiosResponse<T>>(url: string, data: any, config?: Config): Promise<R>;
    put<T = any, R = AxiosResponse<T>>(url: string, data: any, config?: Config): Promise<R>;
    delete<T = any, R = AxiosResponse<T>>(url: string, config?: Config): Promise<R>;
    patch<T = any, R = AxiosResponse<T>>(url: string, data: any, config?: Config): Promise<R>;
}
