import { ReactNode, useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Navigate,
  Route,
  Routes,
  useNavigate,
  useRoutes,
} from "react-router-dom";
import { RouteConfig, routers } from "./router";
import AuthRoute from "./router/AuthRoute";

const App = () => {
  const [isLogin, setIsLogin] = useState(false);

  const element = useRoutes(routers);

  const loginState = useSelector((state: any) => state.public.loginState);

  console.log(loginState, "loginState...");

  const RouteAuthFun = useCallback(
    (routeList: RouteConfig[]) => {
      return routeList.map(
        (item: {
          path: string;
          auth: boolean;
          element: ReactNode;
          children?: any;
        }) => {
          return (
            <Route
              path={item.path}
              element={
                <AuthRoute auth={item.auth} key={item.path}>
                  {item.element}
                </AuthRoute>
              }
              key={item.path}
            >
              {item?.children && RouteAuthFun(item.children)}
            </Route>
          );
        }
      );
    },
    [loginState]
  );
  return <Routes>{RouteAuthFun(routers)}</Routes>;
};

export default App;
