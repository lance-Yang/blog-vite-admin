// src/routes/config.tsx

import { FC, Fragment, ReactNode, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  matchRoutes,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { routers } from "./index";

const RouterAuth = ({ children }: any) => {
  const loginState = useSelector((state: any) => state.public.loginState);

  const token = localStorage.getItem("blogToken") || "";

  const navigate = useNavigate();

  const location = useLocation();
  // 匹配当前层级路由树
  const mathchs = matchRoutes(routers, location);

  useEffect(() => {
    if (
      loginState == "logout" ||
      token == ""
    ) {
      console.log("需要登录");
      // 跳转到登录  state保存源路由
      // <Navigate to="/login" state={{ from: location.pathname }} replace />;
      navigate("/login");
    }

    if (token != "" && loginState == "login") {
      navigate("/home");
    }
  }, [location, loginState, token]);

  // 建议打个断点这里调一下，matchs是返回的层级路由
  // 第一个元素为根路由 最后一个元素为当前路由
  // 所以我们从前往后匹配
  //   const auth = mathchs?.some((item: any) => {
  //     const route: any = item.route;

  //     console.log(route, "matchshs 匹配的路由。。。");
  //     // 没有配置字段的直接返回
  //     // if (!route.auth) return false;
  //     // 返回是否需要登录
  //     return route.auth;
  //   });

  //   console.log(auth,'auth....')

  console.log(loginState, "loginState");
  console.log(location, "location");
  console.log(mathchs, "mathchs");
  console.log(token, "token");

  // if (loginState == "" || token == "" ) {
  //   console.log("需要登录");
  //   // 跳转到登录  state保存源路由
  //   return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  // }

  // if (token != "" && loginState == "login"){
  //   navigate('/home')
  // }
  // return children as React.ReactElement
  return <Fragment>{children}</Fragment>;
};

export default RouterAuth;
