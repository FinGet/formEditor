import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios'
import {RequestConfigType, ResponseType} from '@/api/request/types'
import {ElMessage} from 'element-plus'

const env = import.meta.env
const onError = (err: any) => {
  if (err.message.includes('timeout')) {
    ElMessage({
      message: '请求超时',
      type: 'error'
    })
  }
  return Promise.reject(err)
}


const instance: AxiosInstance = axios.create({
  baseURL: env.VITE_BASE_URL,
  // baseURL: 'http://api-v2.apkssr.com',
  headers: {
    'Content-Type': 'application/json',
  }
})


instance.interceptors.request.use((config: AxiosRequestConfig) => {
  // @ts-ignore
  config.headers['Access-Token'] = 'test'
  // console.log(config)
  return ({
    ...config,
  })
}, onError)

instance.interceptors.response.use((response: AxiosResponse) => {
  if (response && response.data) {
    return Promise.resolve(response)
  } else {
    return Promise.reject('response 不存在')
  }
}, onError)


const request = async <T>(config: RequestConfigType): Promise<ResponseType<T>> => {
  return new Promise(async (resolve, reject) => {
    try{
      const {data} = await instance.request<ResponseType<T>>(config)
      if (data.code == 0) {
        if (config.successToast) {
          ElMessage({
            message: data.msg || '请求成功！',
            type: 'success',
          })
        }
        resolve(data)
      } else {
        if (config.errorToast) {
          ElMessage({
            message: data.msg,
            type: 'error',
          })
        }
        reject(data)
      }
    }catch(err:any){
      const data={
        code: -1,
        msg: err.message || '请求失败',
        data: null as any
      }
      ElMessage({
        message: data.msg,
        type: 'error',
      })
      reject(data)
    }
  })
}

/**
 *
 * @param url
 * @param params
 * @param successToast
 * @param errorToast
 */
export const getRequest = function <T>(url: string, params: object = {}, successToast: boolean = false, errorToast: boolean = true): Promise<ResponseType<T>> {
  return request<T>({
    url,
    method: 'get',
    params: params,
    successToast,
    errorToast
  })
}

/**
 *  post接口默认提示成功和失败
 * @param url
 * @param params
 * @param successToast
 * @param errorToast
 */
export const postRequest = function <T>(url: string, params: object = {}, successToast: boolean = true, errorToast: boolean = true): Promise<ResponseType<T>> {
  return request<T>({
    url,
    method: 'post',
    data: params,
    successToast,
    errorToast
  })
}


export default request
