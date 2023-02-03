import { Layout, Menu, Typography } from "antd";
import React, { ReactNode, useEffect } from "react";
import {
  matchRoutes,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
const { Footer, Content, Header } = Layout;

import CustomHeader from "./Header";
import LayoutRight from "./LayoutRight";
import SpinLoading from "../Spinner";
import { routers } from "../../router";
import { useSelector } from "react-redux";
// import MenuProps from "./MenuProps";

const { Text } = Typography;

const LayoutPage = ({ children }: { children?: ReactNode }) => {
  // const location = useLocation();
  // const token = localStorage.getItem("blogToken") || "";
  // const navigate = useNavigate();

  // const loginState = useSelector((state: any) => state.public.loginState);
  // const mathchs = matchRoutes(routers, location);

  // const isExist = mathchs?.some((item) => item.pathname == location.pathname);

  // useEffect(() => {
  //   if (token && isExist && loginState == "login") {
  //     if (location.pathname == "/" || location.pathname == "login") {
  //       navigate("/home");
  //     } else {
  //       navigate(location.pathname);
  //     }
  //   }
  // }, [token, location.pathname]);

  return (
    <Layout style={{ height: "100vh" }}>
      <div className="layout_header">
        <CustomHeader />
      </div>

      <div style={{ overflow: "auto", height: "100%", paddingBottom: 40 }}>
        <Content className="layout_content">
          <div className="content_left">
            <React.Suspense fallback={<SpinLoading />}>
              <Outlet />
            </React.Suspense>
          </div>
          <div className="content_right">
            <LayoutRight />
          </div>
        </Content>
      </div>
      {/* <Footer className='layout_footer'>
        <div >
          <Text type="secondary">Ant Design (secondary)</Text>
        </div>
      </Footer> */}
    </Layout>
  );
};
export default LayoutPage;
