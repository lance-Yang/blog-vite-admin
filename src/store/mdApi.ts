

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

// 登录接口
const mdApi = createApi({
    reducerPath: 'mdApi', // Api的标识，不能和其他的Api或reducer重复
    baseQuery: fetchBaseQuery({
        baseUrl:""
    }),
    endpoints(build) {
        return {
            // 获取md文档
            getMdDocument: build.query({
                query() {
                    return {
                        url: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-78abecd5-154a-4bdc-90ef-f4959377f1bc/74d50ee9-c886-4b8e-875f-3faadd9fef55.md'
                    }
                },
                // transformResponse 用来转换响应数据的格式
				transformResponse(baseQueryReturnValue:any) {
                    console.log(baseQueryReturnValue,'baseQueryReturnValue')
					return baseQueryReturnValue?.error?.data || '';
				}
            })
        }
    } // endpoints 用来指定Api中的各种功能，是一个方法，需要一个对象作为返回值
})

// Api对象创建后，对象中会根据各种方法自动的生成对应的钩子函数
// 通过这些钩子函数，可以来向服务器发送请求
// 钩子函数的命名规则 fetchLogin --> useFetchLoginQuery
export const {
    useGetMdDocumentQuery
} = mdApi;

export default mdApi;
