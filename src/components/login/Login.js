import React, { Fragment, useContext, useState } from "react";
import { Form, Input, Button, Divider, Alert } from "antd";
import {
  UserOutlined,
  FacebookFilled,
  GoogleCircleFilled,
} from "@ant-design/icons";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import getConfig from "next/config";
import { useRouter } from "next/router";
import { UserContext } from "../../contexts/UserContext";
import axiosInstance from "../axios";

const Login = () => {
  const [user, setUser] = useState(null);
  const router = useRouter();
  const { setJwt, apiEndPoint } = useContext(UserContext);

  const [msg, setErr] = useState(null);

  const { t } = useTranslation();

  const onChange = (e) => {
    setUser({
      ...(user ? user : {}),
      [e.target.name]: e.target.value,
    });
  };

  const layout = {
    labelCol: { span: 20 },
    wrapperCol: { span: 40 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 40 },
  };

  const onFinish = () => {
    axiosInstance
      .post("/authenticate", {
        email: user.email,
        password: user.password,
      })
      .then((res) => {
        setJwt(res.data.jwt);
        router.push(res.data.redirect);
      })
      .catch((err) => {
        setErr(err.response.data);
      });
  };

  const onFinishFailed = () => {
    console.log("el boton funciona pero no se cargo bien el formilario");
  };

  return (
    <Fragment>
      {msg ? <Alert message={t(msg)} type="error" /> : null}

      <Form
        {...layout}
        layout="vertical"
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Email"
          name="itemName"
          rules={[{ required: true, message: "Ingrese el nombre de usuario!" }]}
        >
          <Input
            name="email"
            size="large"
            placeholder="Ingrese el email"
            suffix={<UserOutlined />}
            onChange={onChange}
          />
        </Form.Item>

        <Form.Item
          label="Contraseña"
          name="itemPassword"
          rules={[{ required: true, message: "Ingrese la contraseña!" }]}
        >
          <Input.Password
            name="password"
            placeholder="Ingrese su contraseña"
            size="large"
            onChange={onChange}
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Ingresar
          </Button>
        </Form.Item>
      </Form>

      <Divider> o </Divider>

      <Button
        type="secondary"
        size="large"
        icon={<FacebookFilled />}
        suffix={<UserOutlined />}
      >
        Ingresar con
      </Button>
      <Button type="secondary" size="large" icon={<GoogleCircleFilled />}>
        Ingresar con
      </Button>
    </Fragment>
  );
};

export async function getStaticProps() {
  console.log(JSON.stringify(getConfig()));
  return { props: { apiEndPoint: "localhost" } };
}

export default Login;
