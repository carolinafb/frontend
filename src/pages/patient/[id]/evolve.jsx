import React, { Fragment, useContext, useEffect, useState } from "react";
import { UserContext } from "src/contexts/Context";
import Navbar from "src/components/header/Navbar";
import { Layout, Steps, Button, Form, Result, Row, Col, Alert } from "antd";
const { Step } = Steps;
import Head from "next/head";
import axiosInstance from "src/components/axios";
import { useRouter } from "next/router";
import VitalSignsForm from "src/components/patients/VitalSignsForm";
import RespiratorySystemForm from "src/components/patients/RespiratorySystemForm";
import StudiesForm from "src/components/patients/StudiesForm";
import ObservationsForm from "src/components/patients/ObservationsForm";
import UTIForm from "src/components/patients/UTIForm";
import SymptomsForm from "src/components/patients/SymptomsForm";

const Evolve = ({ ...props }) => {
  const router = useRouter();
  const { DBUser, setLastEvolution, lastEvolution } = useContext(UserContext);
  const { Header, Content } = Layout;
  const [patientName, setPatientName] = useState();
  const [current, setCurrent] = React.useState(0);
  const [sucess, setSucess] = useState(false);
  const [error, setError] = useState(false);
  const [showUTI, setShowUTI] = useState(false);
  const [patientId, setPatientId] = React.useState(null);
  const [evolution, setEvolution] = React.useState({});
  const [form] = Form.useForm();

  const evaluateStructure = (data) => {
    setEvolution({ ...evolution, ...data });
  };

  useEffect(() => {
    DBUser.systemName === "UTI" && setShowUTI(true);
    const patientID = router.query.id;
    if (!patientID) return;
    setPatientId(parseInt(patientID));
    axiosInstance
      .get("/lastEvolveAndPatientData", {
        params: { id: patientID },
      })
      .then((response) => {
        setPatientName(`${response.data.name}, ${response.data.lastName}`);

        if (lastEvolution != null) setLastEvolution(response.data.lastEvolve);
      })
      .catch((err) => {
        setError(true);
        console.log(err);
      });
  }, [router.query.id]);

  const finishHandler = () => {
    form.validateFields().then((data) => {
      const updatedEvolution = { ...evolution, ...data };
      axiosInstance
        .post("/patient/evolve", {
          evolution: updatedEvolution,
          patientId,
        })
        .then(() => setSucess(true))
        .catch((err) => {
          setError(err.message);
          console.log(err);
        });
    });
  };

  const steps = [
    {
      title: "Signos vitales",
      content: <VitalSignsForm form={form} />,
    },
    {
      title: "Sistema respiratorio",
      content: <RespiratorySystemForm form={form} />,
    },
    {
      title: "Otros síntomas",
      content: <SymptomsForm form={form} />,
    },
    {
      title: "Estudios de hoy",
      content: <StudiesForm form={form} />,
    },
    {
      title: "Observaciones",
      content: <ObservationsForm form={form} />,
    },
  ];

  const next = () => {
    form.validateFields().then((data) => {
      evaluateStructure(data);
    });
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };
  {
    showUTI &&
      steps.push({
        title: "UTI",
        content: <UTIForm form={form} />,
      });
  }
  return (
    <>
      <Head>
        <title>Evolucionar paciente</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Layout>
        <Header style={{ backgroundColor: "rgb(107, 45, 177)" }}>
          <Navbar user={DBUser} />
        </Header>
        <Content>
          {sucess ? (
            <Result
              status="success"
              title="Se agrego la evolucion CORRECTAMENTE"
              extra={
                <Button
                  type="primary"
                  style={{ backgroundColor: "#4CAF50", border: "#4CAF50" }}
                  onClick={() => {
                    if (DBUser && DBUser.role == "DOCTOR") {
                      router.push("/patients");
                    } else {
                      router.push("/systems");
                    }
                  }}
                >
                  Continuar
                </Button>
              }
            />
          ) : (
            <Fragment>
              <Row justify="start">
                <Col
                  xs={{ span: 22, offset: 1 }}
                  sm={{ span: 20, offset: 2 }}
                  lg={{ span: 18, offset: 3 }}
                  xl={{ span: 16, offset: 4 }}
                >
                  <h1>{patientName}</h1>
                  <Steps size="small" current={current}>
                    {steps.map((item) => (
                      <Step key={item.title} title={item.title} />
                    ))}
                  </Steps>
                  {error && (
                    <Alert
                      message={error}
                      type="error"
                      style={{ alignContent: "center" }}
                    />
                  )}

                  <div className="steps-content">{steps[current].content}</div>
                  <div className="steps-action">
                    {current < steps.length - 1 && (
                      <Button type="primary" onClick={() => next()}>
                        Siguiente
                      </Button>
                    )}
                    <Button type="primary" onClick={finishHandler}>
                      Finalizar
                    </Button>
                    {current > 0 && (
                      <Button
                        style={{ margin: "0 8px" }}
                        onClick={() => prev()}
                      >
                        Anterior
                      </Button>
                    )}
                  </div>
                </Col>
              </Row>
            </Fragment>
          )}
        </Content>
      </Layout>
    </>
  );
};

export default Evolve;
