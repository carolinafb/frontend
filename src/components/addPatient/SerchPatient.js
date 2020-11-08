import axios from "axios";
import { useRouter } from "next/router";
import { UserContext } from "../../contexts/UserContext";
import { useTranslation } from "react-i18next";
import React, { useState, useContext } from "react";
import { Space, Typography, InputNumber, Alert, Form, Button } from "antd";

const SerchPatient = () => {
  const router = useRouter();
  const { Title } = Typography;
  const { t } = useTranslation();
  const { setJwt, apiEndPoint } = useContext(UserContext);
  const [dni, setDni] = useState(0);
  const [msg, setErr] = useState(null);

  const onChange = (value) => {
    setDni({
      ...(dni ? dni : {}),
      dni: value,
    });
  };

  const onFinish = () => {
    axios
      .post(apiEndPoint + "/addPatient", {
        dni: dni,
      })
      .then((res) => {
        setJwt(res.data.jwt);
        router.push(res.data.redirect);
      })
      .catch((err) => {
        setErr(err.response.data);
      });
  };

  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <Title align="center" level={3} style={{ marginTop: "3%" }}>
        INGRESAR PACIENTE
      </Title>
      {msg ? <Alert message={t(msg)} type="error" /> : null}

      <Form
        style={{ marginLeft: "3%" }}
        layout="horizontal"
        name="addPatientForm"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          label="Ingrese el DNI: "
          name="dniLabel"
          rules={[{ required: true, message: "Ingrese el DNI de la persona" }]}
        >
          <InputNumber
            name="dni"
            style={{ width: "50%" }}
            onChange={onChange}
          />
        </Form.Item>

        <Form.Item>
          <Button name="button" type="primary" htmlType="submit">
            Buscar
          </Button>
        </Form.Item>
      </Form>
      <Alert
        message="Nota"
        description="Al ingresar el DNI de la persona.
                        Si esta existe en el sistema se mostrara los datos de esta.
                        Si no existe, te direccionara a una pantalla para cargar sus datos"
        type="info"
        showIcon
      />
    </Space>
  );
};
export default SerchPatient;
