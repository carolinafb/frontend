import React from "react";
import { Form } from "antd";

import StudieElementImput from "./StudieElementImput";

const StudiesForm = ({ form }) => {
  return (
    <Form
      form={form}
      layout="vertical"
      style={{ width: "100%" }}
      name="studiesForm"
      initialValues={{
        remember: true,
      }}
    >
      <StudieElementImput label="Rx Tx" name="RxTx" />
      <StudieElementImput label="TAC de Torax" name="TAC" />
      <StudieElementImput label="ECG" name="ECG" />
      <StudieElementImput label="PCR Covid" name="PCR" />
    </Form>
  );
};

export default StudiesForm;
