import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { GET_CAPTCHA, LOGIN } from "../api/api";
import { baseUrl } from "../api/baseQuery";
import { message } from "antd";

// 登录接口
const loginApi = createApi({
  reducerPath: "loginApi", // Api的标识，不能和其他的Api或reducer重复
  baseQuery: fetchBaseQuery({
    baseUrl,
  }),
  endpoints(build) {
    return {
      // 登录
      login: build.mutation({
        query(args) {
          return {
            url: LOGIN,
            params: args,
          };
        }
      }),
      // 获取验证码
      getCaptcha: build.query({
        query() {
          return GET_CAPTCHA;
        },
        // transformResponse 用来转换响应数据的格式
        transformResponse(res: any) {
          if (res?.code == 200) {
            return {
              ...res.data,
              captcha_img: `data:image/png;base64,${res?.data?.captcha_img}`,
            };
          } else {
            message.error("请求验证码失败，请重新刷新!");
          }
        },
        // keepUnusedDataFor: 60, // 设置数据缓存的时间，单位秒 默认60s
      }),
    };
  }, // endpoints 用来指定Api中的各种功能，是一个方法，需要一个对象作为返回值
});

// Api对象创建后，对象中会根据各种方法自动的生成对应的钩子函数
// 通过这些钩子函数，可以来向服务器发送请求
// 钩子函数的命名规则 fetchLogin --> useFetchLoginQuery
export const { useLoginMutation, useGetCaptchaQuery } = loginApi;

export default loginApi;
