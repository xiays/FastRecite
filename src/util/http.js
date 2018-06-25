
import axios from 'axios' //引用axios
import {getCookie,delCookie} from './util' //引用刚才我们创建的util.js文件，并使用getCookie方法
import qs from 'qs'
import {router} from '../router'

// axios 配置
axios.defaults.timeout = 5000;
axios.defaults.baseURL = ''; //这是调用数据接口
// http request 拦截器，通过这个，我们就可以把Cookie传到后台
axios.interceptors.request.use(
  config => {
    const token = getCookie('session'); //获取Cookie
    config.data = JSON.stringify(config.data);
    config.headers = {
      // 'Content-Type':'application/x-www-form-urlencoded' //设置跨域头部
      'Content-Type':'application/json'

    };
    if (token) {
      config.params = {'token': token} //后台接收的参数
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);


    // http response 拦截器
axios.interceptors.response.use(
  response => {
    //response.data.errCode是我接口返回的值，如果值为2，说明Cookie丢失，然后跳转到登录页，这里根据大家自己的情况来设定
    //code:101失效    	
    
    return response;
  },
  error => {
  	if (error.response!=undefined)
    return Promise.reject(error.response.data)
    else
    return Promise.reject('error data null')
  });

export default axios;

/**
 * fetch 请求方法
 * @param url
 * @param params
 * @returns {Promise}
 */
export function fetch(url, params = {}) {

  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params
    })
    .then(response => {
      resolve(response.data);
    })
    .catch(err => {
      reject(err)
    })
  })
}

export function get(url) {
  return new Promise((resolve, reject) => {
    axios.get(url)
      .then(response => {
      	if (response!=undefined)
        resolve(response.data);
        else
        resolve('');
        
      }, err => {
        reject(err);
      })
  })
}

/**
 * post 请求方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url, data) {
  return new Promise((resolve, reject) => {
    axios.post(url, data)
      .then(response => {
        resolve(response.data);
      }, err => {
        reject(err);
      })
  })
}

/**
 * patch 方法封装
 * @param url
 * @param data
 * @returns {Promise}
 */
export function patch(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.patch(url, data)
      .then(response => {
        resolve(response.data);
      }, err => {
        reject(err);
      })
  })
}

/**
 * put 方法封装
 * @param url
 * @param data
 * @returns {Promise}
 */
export function put(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.put(url, data)
      .then(response => {
        resolve(response.data);
      }, err => {
        reject(err);
      })
  })
}
