import React, { Fragment, useState } from "react";
import axiosInstance from "../axios";
import { Steps, Button, Row, Col, Form, Result, Alert, Spin } from "antd";
import AffiliateData from "./AffiliateDataForm";
import PersonalHistory from "./PersonalHistoryForm";
import ContactPerson from "./ContactPersonForm";

import { useRouter } from "next/router";

const AddPatientData = () => {
  const [current, setCurrent] = useState(0);
  const [data, setData] = useState({});
  const [form] = Form.useForm();
  const { Step } = Steps;
  const [sucess, setSucess] = useState(false);
  const [error, setError] = useState(false);
  const [redir, setRedirect] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const steps = [
    {
      title: "Datos Filiatorios",
      content: <AffiliateData form={form} />,
    },
    {
      title: "Antecedentes Personales",
      content: <PersonalHistory form={form} />,
    },
    {
      title: "Persona de contacto",
      content: <ContactPerson form={form} />,
    },
  ];

  const onOk = () => {
    form.validateFields().then((values) => {
      const newData = { ...data, ...values };
      setData(newData);
      if (current < 2) {
        next();
      } else {
        setLoading(true);
        axiosInstance
          .put("/patient", newData)
          .then((res) => {
            if (res.status) {
              setSucess(true);
              setError(false);
              setRedirect(res.data.redirect);
            }
          })
          .catch((err) => {
            setLoading(false);
            setError(err.message);
          });
      }
    });
  };

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  return (
    <Fragment>
      {sucess ? (
        <Result
          status="success"
          title="Se agrego al paciente CORRECTAMENTE"
          extra={
            <Button
              type="primary"
              style={{ backgroundColor: "#4CAF50", border: "#4CAF50" }}
              onClick={() => {
                router.push(redir);
              }}
            >
              Continuar
            </Button>
          }
        />
      ) : (
        <Fragment>
          <Steps size="small" current={current}>
            {steps.map((item) => (
              <Step
                key={item.title}
                title={item.title}
                style={{ margin: "1%", padding: "0%" }}
              />
            ))}
          </Steps>
          <Row justify="start">
            <Col
              xs={24}
              sm={{ span: 15, offset: 1 }}
              lg={{ span: 10, offset: 1 }}
              xl={{ span: 6, offset: 1 }}
            >
              {error && (
                <Alert
                  message={error}
                  type="error"
                  style={{ alignContent: "center" }}
                />
              )}
              {loading && (
                <div className="align-column-center margin__big">
                  <Spin size="large" tip="Loading..." />
                </div>
              )}
              {steps[current].content}
            </Col>
          </Row>
          <Fragment>
            {current < steps.length - 1 && (
              <Button
                style={{ marginBottom: "2%", marginLeft: "2%" }}
                type="primary"
                onClick={onOk}
              >
                Siguiente
              </Button>
            )}
            {current === steps.length - 1 && (
              <Button
                style={{ marginBottom: "2%", marginLeft: "2%" }}
                type="primary"
                onClick={onOk}
              >
                Continuar
              </Button>
            )}
            {current > 0 && (
              <Button
                style={{ marginBottom: "2%", marginLeft: "3px" }}
                onClick={prev}
              >
                Anterior
              </Button>
            )}
          </Fragment>
        </Fragment>
      )}
    </Fragment>
  );
};

export default AddPatientData;
