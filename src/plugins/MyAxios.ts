import axios, { AxiosResponse, AxiosPromise } from 'axios'
import { BaseRequestResult } from '@/api/BaseRequestResult'
// import {appAdapter} from './axios/app'

// 改成调用原生请求服务端,增加环境判断
// axios.defaults.adapter = appAdapter

const myAxios: any = {
  reqCount: 0,
  install(Vue: any, option: any) {
    let axiosDefualtOpts = {
      headers: {
        post: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      },
      timeout: 50000,
      transformRequest: [
        function (data: JSON) {
          return 'JSON=' + JSON.stringify(data)
        }],
      ...option
    }

    const service = axios.create(axiosDefualtOpts)

    /**
     * 配置请求拦截
     * 请求失败分发请求失败事件
     */
    service.interceptors.request.use(config => {
      // 1. 拦截添加loading
      // showLoadingToast()
      // config.data =  JSON.stringify(config.data)
      // 2. 拦截token, 自动添加,
      let ACCESS_TOKEN = sessionStorage.getItem('ACCESS_TOKEN')
      if (sessionStorage.getItem('ACCESS_TOKEN')) {
        config.url = config.url + '&ACCESS_TOKEN=' + ACCESS_TOKEN
      }
      myAxios.reqCount++
      return config
    }, error => {
      console.log('发送请求异常：', error)
      if (window.eventBus) {
        window.eventBus.$emit('ajax.request.error', error)
      }
      myAxios.reqCount--
      return Promise.reject({
        error: error,
        isLogicError: false,
        errorMessage: '网络异常,请检查网络'
      })
    })

    /**
     * 配置返回拦截
     * 请求返回失败分发返回失败事件
     */
    service.interceptors.response.use(response => {
      // closeLoadingToast()
      // 访问cabala会存入response.data.data,在拦截器处理下
      let responseData
      if (response.data.data && typeof (response.data.data) === 'string') {
        responseData = JSON.parse(response.data.data)
      } else {
        responseData = response.data
      }

      let requestResult = new BaseRequestResult(responseData.code, responseData.data)
      response.data = requestResult

      myAxios.reqCount++
      return response
    }, error => {
      // closeLoadingToast()
      if (window.eventBus) {
        window.eventBus.$emit('ajax.response.error', error)
      }
      myAxios.reqCount--
      if (error.response && error.response.data) {
        return Promise.reject({
          error: error.response.data,
          isLogicError: true,
          errorMessage: error.response.data.message || '网络异常,请检查网络'
        })
      } else {
        return Promise.reject({
          error: error,
          isLogicError: false,
          errorMessage: '网络异常,请检查网络'
        })
      }
    })

    Vue.prototype.$axios = service
    Vue.prototype.$http = {
      get<T = any>(url: string, data: JSON, options = {}): AxiosPromise<T> {
        let _opt: any = {
          ...options,
          method: 'get',
          url,
          data: data
        }
        return service(_opt)
      },
      post<T = any>(url: string, data: JSON, options = {}): AxiosPromise<T> {
        let _opt: any = {
          ...options,
          method: 'post',
          url,
          data: data
        }
        return service(_opt)
      }
    }
  }
}

export default myAxios
