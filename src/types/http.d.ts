import Vue from 'vue'
import { AxiosInstance, AxiosResponse, AxiosPromise } from 'axios';

interface RequestHttp {
  /**
   * post请求
   */
  post<T = any>(url: string, data: object, options: object | null): AxiosPromise<T>;

  /**
   * get请求
   *
   * @template T BaseRequestResult<any>
   * @param {string} url 请求地址
   * @param {object} data 请求参数
   * @param {(object | null)} options axios参数
   * @returns {AxiosPromise<T>} 返回类型AxiosPromise<BaseRequestResult<any>>
   */
  get<T = any>(url: string, data: object, options: object | null): AxiosPromise<T>
}

// 声明vue实例属性声明http请求属性
declare module 'vue/types/vue' {
  interface Vue {
    /**
     * axios实例
     */
    $axios: AxiosInstance;

    /**
     * http请求
     */
    $http: RequestHttp;

    go(url: string): void
  }
}
