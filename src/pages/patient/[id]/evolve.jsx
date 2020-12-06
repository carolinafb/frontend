import React, { Fragment, useContext, useEffect, useState } from "react";
import { UserContext } from "src/contexts/Context";
import Navbar from "src/components/header/Navbar";
import { Layout, Steps, Button, Form, Result, Row, Col } from "antd";
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

var objStrToInt = function (obj) {
  // convierte todas las claves de string a number
  return Object.keys(obj).reduce(
    (attrs, key) => ({
      ...attrs,
      [key]: parseInt(obj[key]),
    }),
    {}
  );
};

const Evolve = ({ ...props }) => {
  const router = useRouter();
  const { DBUser } = useContext(UserContext);
  const { Header, Content } = Layout;
  const [patientName, setPatientName] = useState();
  const [current, setCurrent] = React.useState(0);
<<<<<<< HEAD
  const [sucess, setSucess] = useState(false);
  const [showUTI, setShowUTI] = useState(false);
=======
  const [patientId, setPatientId] = React.useState(null);
  const [evolution, setEvolution] = React.useState({});
>>>>>>> 6e5ea91e2f515ccf0c33caffa45b851b53bf6cd4
  const [form] = Form.useForm();

  const finishHandler = () => {
    form.validateFields().then((data) => {
      const updatedEvolution = { ...evolution, ...objStrToInt(data) };
      setEvolution(updatedEvolution);
      axiosInstance
<<<<<<< HEAD
        .post("/patient/evolve", { ...data })
        .then(() => setSucess(true))
=======
        .post("/patient/evolve", {
          evolution: updatedEvolution,
          patientId,
        })
        .then(() => router.push("/patients"))
>>>>>>> 6e5ea91e2f515ccf0c33caffa45b851b53bf6cd4
        .catch((err) => console.log(err));
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
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };
  useEffect(() => {
    // console.log(router.query.id);
    DBUser.systemName === "UTI" && setShowUTI(true);
    const patientID = router.query.id;
    if (!patientID) return;
    setPatientId(parseInt(patientID));
    axiosInstance
      .get("/patient", { params: { id: patientID } })
      .then((response) =>
        setPatientName(`${response.data.name}, ${response.data.lastName}`)
      );
    const patientName = "Carlos"; // await axiosInstance.get('/patient');
    setPatientName(patientName);
  }, [router.query.id]);

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
              title="Se agrego al paciente CORRECTAMENTE"
              extra={
                <Button
                  type="primary"
                  style={{ backgroundColor: "#4CAF50", border: "#4CAF50" }}
                  onClick={() => {
                    router.push("/patients");
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
                  {showUTI &&
                    steps.push({
                      title: "UTI",
                      content: <UTIForm form={form} />,
                    })}
                  <Steps size="small" current={current}>
                    {steps.map((item) => (
                      <Step key={item.title} title={item.title} />
                    ))}
                  </Steps>
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
