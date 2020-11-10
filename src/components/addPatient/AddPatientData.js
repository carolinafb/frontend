import React, { Fragment } from "react";
import { Steps, Button, message, Row, Col } from "antd";
import AffiliateData from "./AffiliateData";
import PersonalHistory from "./PersonalHistory";
import ContactPerson from "./ContactPerson";

const AddPatientData = () => {
  const { Step } = Steps;
  const steps = [
    {
      title: "Datos Filiatorios",
      content: <AffiliateData />,
    },
    {
      title: "Antecedentes Personales",
      content: <PersonalHistory />,
    },
    {
      title: "Persona de contacto",
      content: <ContactPerson />,
    },
  ];

  const [current, setCurrent] = React.useState(0);
  //const [pattient, setPattient] = React.useState(0);

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
            onClick={() => next()}
          >
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button
            style={{ marginBottom: "2%", marginLeft: "2%" }}
            type="primary"
            onClick={() => message.success("Processing complete!")}
          >
            Done
          </Button>
        )}
        {current > 0 && (
          <Button
            style={{ marginBottom: "2%", marginLeft: "3px" }}
            onClick={() => prev()}
          >
            Previous
          </Button>
        )}
      </div>
    </Fragment>
  );
};

export default AddPatientData;
