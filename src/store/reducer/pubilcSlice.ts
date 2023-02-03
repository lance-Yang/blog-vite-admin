// createSlice 创建reducer的切片
// 它需要一个配置对象作为参数，通过对象的不同的属性来指定它的配置
import { createSlice } from "@reduxjs/toolkit";

type initialStateType = {
  userInfo: object | null;
  loginState: string;
  mdDocument: mdDocumentObj;
};

type mdDocumentObj = {
  url: string;
  content: string;
};

const initialState: initialStateType = {
  userInfo: null,
  loginState: "logout",
  mdDocument: {
    url: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-78abecd5-154a-4bdc-90ef-f4959377f1bc/74d50ee9-c886-4b8e-875f-3faadd9fef55.md",
    content: "",
  },
};

const publicSlice = createSlice({
  name: "publicSlice", // 用来自动生成action中的type
  initialState, // state的初始值
  reducers: {
    // 指定state的各种操作，直接在对象中添加方法
    setMdDocument(state, action) {
      state.mdDocument.url = action.payload.url || "";
      state.mdDocument.content = action.payload.content || "";
    },
    setUserInfo(state, action) {
      state.userInfo = action.payload;
    },
    setLogin(state,action){
      state.loginState = action.payload
    }
  },
});

// 切片对象会自动的帮助我们生成action
// actions中存储的是slice自动生成action创建器（函数），调用函数后会自动创建action对象
// action对象的结构 {type:name/函数名, payload:函数的参数}
export const { setMdDocument, setUserInfo , setLogin} = publicSlice.actions;
export const { reducer: publicReducer } = publicSlice;
