import React, { Fragment, useState } from "react";
import { Form, Input, Button, Divider, Alert } from "antd";
import {
  UserOutlined,
  FacebookFilled,
  GoogleCircleFilled,
} from "@ant-design/icons";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import { useTranslation } from "react-i18next";
import axios from "axios";

const Login = ({ apiEndPoint }) => {
  const [user, setUser] = useState(null);

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
    console.log("el boton funciona y cargo bien el formulario");
    axios.post(apiEndPoint + "/authenticate").catch((err) => {
      setErr("msgError");
    });
  };

  const onFinishFailed = () => {
    console.log("el boton funciona pero no se cargo bien el formilario");
  };

  return (
    <Fragment>
      <I18nextProvider i18n={i18n}>
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
            label="Nombre de Usuario"
            name="itemName"
            rules={[
              { required: true, message: "Ingrese el nombre de usuario!" },
            ]}
          >
            <Input
              name="username"
              size="large"
              placeholder="large size"
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
          {" "}
          Ingresar con
        </Button>
        <Button type="secondary" size="large" icon={<GoogleCircleFilled />}>
          {" "}
          Ingresar con
        </Button>
      </I18nextProvider>
    </Fragment>
  );
};

export async function getStaticProps(context) {
  return {
    props: { apiEndPoint: process.env.NEXT_PUBLIC_APIENDPOINT }, // will be passed to the page component as props
  };
}

export default Login;