import React, { useEffect, useState } from "react";
import { Form, Input, Button, message, Checkbox } from "antd";
import {
  UserOutlined,
  LockOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import styles from "./login.module.css";
import "./square.css";
import { useGetCaptchaQuery, useLoginMutation } from "../store/loginApi";
import { setLogin, setUserInfo } from "../store/reducer/pubilcSlice";
import { useDispatch } from "react-redux";

const LoginPage: React.FC<{}> = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    // 数据
    data: captcha,
    // 刷新方法
    refetch: refetchCaptcha,
    // 判断是否出错
    isError,
  } = useGetCaptchaQuery(null, {
    // 响应前对数据进行处理
    selectFromResult: (res) => {
      const newRes = { ...res };
      if (newRes.data?.code == 200) {
        newRes.data = {
          ...newRes.data,
          captcha_img: `data:image/png;base64,${newRes?.data?.data?.captcha_img}`,
        };
      }
      return newRes;
    },
  });

  const [fetchLogin, { isLoading }] = useLoginMutation();

  useEffect(() => {
    if (isError) {
      message.error("后端接口连接异常！");
    }
  }, [isError]);

  // const handleVerfiCaptcha = (rule: any, value: string, callback: any) => {
  //   if (
  //     value &&
  //     value.toLocaleUpperCase() !== captcha?.captcha_id.toLocaleUpperCase()
  //   ) {
  //     callback(new Error("Verification code error"));
  //   } else {
  //     callback();
  //   }
  // };

  const onFinish = async (values: any) => {
    try {
      const res: any = await fetchLogin(values).unwrap();
      if (res?.code == 200) {
        message.success(res?.message);
        const token = res?.data?.token;
        localStorage.setItem("blogToken", token);
        dispatch(setLogin("login"));
        dispatch(setUserInfo(res?.data?.user));
        navigate("/home");
      } else {
        message.error(res?.message);
        // 重新刷新验证码
        setTimeout(() => {
          refetchCaptcha();
        }, 1000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onRefreshCatch = () => {
    refetchCaptcha();
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginContent}>
        <div className={styles.loginLeft}></div>
        <div className={styles.loginRight}>
          <div className={styles.logTit}>Blog管理系统</div>
          <div className={styles.loginForm}>
            <Form
              name="normal_login"
              className="login-form"
              size="large"
              initialValues={{ remember: true }}
              onFinish={onFinish}
            >
              <Form.Item
                name="account"
                initialValue={"admin"}
                rules={[
                  {
                    required: true,
                    message: "Please input your Account!",
                  },
                ]}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="userCount:admin"
                />
              </Form.Item>
              <Form.Item
                name="password"
                initialValue={"admin123"}
                rules={[
                  {
                    required: true,
                    message: "Please input your Password!",
                  },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="passWord:123456"
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                />
              </Form.Item>
              <div className={styles.captchaContent}>
                <Form.Item
                  name="code"
                  rules={[
                    {
                      required: true,
                      message: "Please input your captcha!",
                    },
                    // { validator: handleVerfiCaptcha },
                  ]}
                >
                  <Input placeholder="captcha" />
                </Form.Item>
                <Form.Item>
                  {/* <div
                    dangerouslySetInnerHTML={{
                      __html: captcha?.captcha_img,
                    }}
                    onClick={onRefreshCatch}
                  ></div> */}
                  <img
                    src={captcha?.captcha_img}
                    style={{ width: "200px", height: "40" }}
                    alt=""
                    onClick={onRefreshCatch}
                  />
                </Form.Item>
              </div>
              <Form.Item labelCol={{ flex: "flex" }}>
                <Form.Item
                  name="remember"
                  valuePropName="checked"
                  noStyle
                  labelCol={{ sm: 6 }}
                >
                  <Checkbox>记住我</Checkbox>
                </Form.Item>

                <a className={styles.loginForgot} href="">
                  忘记密码
                </a>
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={isLoading}
                  style={{ width: "100%" }}
                >
                  Login
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>

      <div className="square">
        <ul>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
      <div className="circle">
        <ul>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
    </div>
  );
};

export default LoginPage;
