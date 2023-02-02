import { Suspense, lazy, ReactNode } from "react";
import { Outlet, Navigate, useRoutes, Route } from "react-router-dom";

import Layout from "../components/Layout";
import LoginPage from "../login";

import NotFound from "../components/404";
const Home = lazy(() => import("../home"));
const About = lazy(() => import("../about"));
const LinkPage = lazy(() => import("../link"));
const MdPage = lazy(() => import("../md"));
// const Layout = lazy(() => import("../components/Layout"));

const LayoutComponent = ({ children }: any) => {
  return (
    <Suspense fallback={""}>
      <Layout />
    </Suspense>
  );
};

export interface RouteConfig {
  path: string;
  element: React.ReactNode;
  auth: boolean;
  children?: RouteConfig[];
  redirect?:string
}

export const routers = [
  { path: "/login", element: <LoginPage />, auth: false },
  {
    path: "/",
    element: <Layout />,
    auth: true,
    children: [
      { path: "/home", element: <Home />, auth: true },
      { path: "/about", element: <About />, auth: true },
      { path: "/auth", element: <About />, auth: true },
      { path: "/link", element: <LinkPage />, auth: true },
      { path: "/md/:id", element: <MdPage />, auth: true },
      { path: "*", element: <NotFound />, auth: true },
    ],
  },
];

// export const Router = () => useRoutes(routers);

// console.log(Router, "路由信息");

// const AuthRouter = (routes:any,) => {
//   let routeList = routes || [];

//   routeList.map(item => {

//   })

// }
