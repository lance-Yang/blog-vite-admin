
import { Layout, Menu, Typography } from "antd";
import React, { ReactNode } from "react";
import { Outlet } from "react-router-dom";
const { Footer, Content, Header } = Layout;

import CustomHeader from "./Header";
import LayoutRight from "./LayoutRight";
import SpinLoading from "../Spinner";
// import MenuProps from "./MenuProps";

const { Text } = Typography;

const LayoutPage = ({ children }: { children?: ReactNode }) => {
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
