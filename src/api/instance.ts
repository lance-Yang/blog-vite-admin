import axios from "axios";

import { message } from "antd";

const instance = axios.create({
  baseURL: "http://localhost:8080",
  timeout: 6000,
  withCredentials: true,
});

/* eslint-disable */
instance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// 响应拦截器
instance.interceptors.response.use(
  (res) => {
    // // 未设置状态码则默认成功状态
    const code = res.data.code || 200;
    // 获取错误信息
    const msg = res.data.message;
    switch (code) {
      case 200:
        return res;
      case 401:
        message.error(msg);
        return Promise.reject("error");
      case 500:
        message.error(msg);
        return Promise.reject(new Error(msg));
      default:
        message.error(msg);
        return Promise.reject("error");
    }
  },
  (error) => {
    let { message } = error;
    if (message == "Network Error") {
      message = "后端接口连接异常";
    } else if (message.includes("timeout")) {
      message = "系统接口请求超时";
    } else if (message.includes("Request failed with status code")) {
      message = "系统接口" + message.substr(message.length - 3) + "异常";
    }
    return Promise.reject(error);
  }
);

/* eslint-disable */
// 设置默认接口地址

const get = (url: string, params = {}) =>
  new Promise((resolve, reject) => {
    instance
      .get(url, {
        params,
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        // return false; 如果返回false 将不会执行promise finally
        reject();
      });
  });
const post = (url: string, data: any, config = {}) =>
  new Promise((resolve, reject) => {
    instance.post(url, data, config).then(
      (response) => {
        resolve(response.data);
      },
      (err) => {
        // return false; 如果返回false 将不会执行promise finally
        reject();
      }
    );
  });
const put = (url: string, data: any, isGet = false) =>
  new Promise((resolve, reject) => {
    instance.put(url, data, isGet ? { params: data } : {}).then(
      (response) => {
        resolve(response.data);
      },
      (err) => {
        return false;
      }
    );
  });
const deletes = (url: string, params = {}) =>
  new Promise((resolve, reject) => {
    instance.delete(url, params).then(
      (response) => {
        resolve(response.data);
      },
      (err) => {
        return err;
      }
    );
  });
function postFile(
  url: string,
  data = {},
  headers = { "Content-Type": "multipart/form-data" }
) {
  return new Promise((resolve, reject) => {
    instance.post(url, data, { headers: headers }).then(
      (response) => {
        resolve(response.data);
      },
      (err) => {
        reject(err);
      }
    );
  });
}
export default { get, post, put, deletes, postFile, instance };
