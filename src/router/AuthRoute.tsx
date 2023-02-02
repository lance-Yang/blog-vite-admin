import { useEffect } from "react";
import { useSelector } from "react-redux";
import { matchRoutes, useLocation, useNavigate } from "react-router-dom";
import { routers } from "./index";

const AuthRoute = ({ children, auth }: any) => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("blogToken") || "";
  const loginState = useSelector((state: any) => state.public.loginState);

  const mathchs = matchRoutes(routers, location);

  const isExist = mathchs?.some(item => item.pathname == location.pathname)

  console.log(mathchs, "mathchs");
  console.log(isExist, "isExist");
  console.log(loginState, "loginState");

  useEffect(() => {
    console.log(token, "token的值。。。。");

    if (token == "" && auth) {
      navigate("/login");
    }
    if(token && isExist ){
        console.log('进入了home.....')
        navigate("/home")
    }
  }, [location,loginState,token]);

  return children;
};

export default AuthRoute;
