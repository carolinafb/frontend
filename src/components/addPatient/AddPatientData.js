import React, { Fragment, useContext, useState } from "react";
import axios from "axios";
import { Steps, Button, Row, Col, Form } from "antd";
import AffiliateData from "./AffiliateData";
import PersonalHistory from "./PersonalHistory";
import ContactPerson from "./ContactPerson";
import { UserContext } from "../../contexts/UserContext";

const AddPatientData = () => {
  const { apiEndPoint } = useContext(UserContext);
  const [current, setCurrent] = useState(0);
  const [data, setData] = useState({});
  const [form] = Form.useForm();
  const { Step } = Steps;
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
    console.log("current ", current);
    form
      .validateFields()
      .then((values) => {
        const newData = { ...data, ...values };
        setData(newData);
        if (current < 2) {
          next();
        } else {
          axios
            .post(apiEndPoint + "/validatePatient", {
              data: newData,
            })
            .then((res) => {
              // router.push(res.data.redirect);
            });
        }
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
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
          {steps[current].content}
        </Col>
      </Row>
      <div>
        {current < steps.length - 1 && (
          <Button
            style={{ marginBottom: "2%", marginLeft: "2%" }}
            type="primary"
            onClick={onOk}
          >
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button
            style={{ marginBottom: "2%", marginLeft: "2%" }}
            type="primary"
            onClick={onOk}
          >
            Done
          </Button>
        )}
        {current > 0 && (
          <Button
            style={{ marginBottom: "2%", marginLeft: "3px" }}
            onClick={prev}
          >
            Previous
          </Button>
        )}
      </div>
    </Fragment>
  );
};

export default AddPatientData;
