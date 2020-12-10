import React from "react";
import { Form } from "antd";
import StudieElementImput from "./StudieElementImput";

const StudiesForm = ({ form }) => {
  const values = {
    remember: true,
  };

  return (
    <Form
      form={form}
      layout="vertical"
      style={{ width: "100%" }}
      name="studiesForm"
      initialValues={{ values }}
    >
      <StudieElementImput label="Rx Tx" name="chestXRay" />
      <StudieElementImput label="TAC de Torax" name="chestCt" />
      <StudieElementImput label="ECG" name="electrocardiogram" />
      <StudieElementImput label="PCR Covid" name="cReactiveProteinCovid" />
    </Form>
  );
};

export default StudiesForm;
