import Vue from 'vue'
import { MyPromise } from '@/api/BaseRequestResult';
import { AxiosInstance } from 'axios'
import { RawLocation } from 'vue-router'

/**
 * Http请求接口
 */
interface RequestHttp {
  /**
   * post请求
   */
  post<T = any>(url: string, data: object, options: object | null): MyPromise<T>;

  /**
   * get请求
   * @param {string} url 请求地址
   * @param {object} data 请求参数
   * @param {(object | null)} options axios参数
   * @returns {MyPromise<T>} 返回类型MyPromise<T>
   */
  get<T = any>(url: string, data: object, options: object | null): MyPromise<T>
}

// 声明vue实例属性声明http请求属性
declare module 'vue/types/vue' {
  interface Vue {
    /**
     * axios实例
     */
    $axios: AxiosInstance;

    /**
    * Http请求接口
    */
    $http: RequestHttp;

    /**
     * 页面跳转
     */
    doPush(url: RawLocation): void;
  }
}
