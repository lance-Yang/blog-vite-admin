import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";



export const useAuth = () => {

    const loginState = useSelector((state: any) => state.public.loginState);

    const token = localStorage.getItem("blogToken") || "";
  
    const navigate = useNavigate();
  
    const location = useLocation();

    // 1. 如果没有登录，只能返回到login路由


    // 2. 登录成功,不能通过地址再重新跳到登录界面，只能通过logout


    

    
}