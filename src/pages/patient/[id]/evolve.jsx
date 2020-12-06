import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "src/contexts/Context";
import Navbar from "src/components/header/Navbar";
import { Layout, Steps, Button, Form } from "antd";
const { Step } = Steps;
import Head from "next/head";
import axiosInstance from "src/components/axios";
import { useRouter } from "next/router";
import VitalSignsForm from "src/components/patients/VitalSignsForm";
import RespiratorySystemForm from "src/components/patients/RespiratorySystemForm";

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
  const [patientId, setPatientId] = React.useState(null);
  const [evolution, setEvolution] = React.useState({});
  const [form] = Form.useForm();

  const finishHandler = () => {
    form.validateFields().then((data) => {
      const updatedEvolution = { ...evolution, ...objStrToInt(data) };
      setEvolution(updatedEvolution);
      axiosInstance
        .post("/patient/evolve", {
          evolution: updatedEvolution,
          patientId,
        })
        .then(() => router.push("/patients"))
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
      content: "Last-content",
    },
    {
      title: "Estudios de hoy",
      content: "Last-content",
    },
    {
      title: "Observaciones",
      content: "Last-content",
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
          <h1>{patientName}</h1>
        </Content>
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
            <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
              Anterior
            </Button>
          )}
        </div>
      </Layout>
    </>
  );
};

export default Evolve;
