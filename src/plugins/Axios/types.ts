import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

export interface Config extends AxiosRequestConfig {
    authorization?: boolean;
    data?: any;
}

export interface Axios extends AxiosInstance {
    /* eslint-disable  @typescript-eslint/no-explicit-any */
    get<T = any, R = NewAxiosResponse<T>>(url: string, config?: Config): Promise<R>;
    post<T = any, R = NewAxiosResponse<T>>(url: string, data: any, config?: Config): Promise<R>;
    put<T = any, R = NewAxiosResponse<T>>(url: string, data: any, config?: Config): Promise<R>;
    delete<T = any, R = NewAxiosResponse<T>>(url: string, data: any, config?: Config): Promise<R>;
    patch<T = any, R = NewAxiosResponse<T>>(url: string, data: any, config?: Config): Promise<R>;
}
export interface NewAxiosResponse<T = any> extends AxiosResponse {
    data: T;
    status: number;
    statusText: string;
    headers: any;
    config: Config;
    request?: any;
  }
