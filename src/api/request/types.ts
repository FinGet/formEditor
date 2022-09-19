import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios'

export interface MetaType {
    pagination?:MetaPaginationType
}

//分页
export interface MetaPaginationType {
    limit: number;
    page_no: number;
    page_total: number;
    total: number;
}
//
export interface ResponseType<T> {
    code: number;
    msg: string;
    data: T;
    meta?: MetaType;
}

export interface RequestConfigType<T = AxiosResponse> extends AxiosRequestConfig{
    successToast:boolean;
    errorToast:boolean;
}
