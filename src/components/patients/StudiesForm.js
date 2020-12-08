import React, { useContext, useEffect } from "react";
import { Form } from "antd";
import { UserContext } from "src/contexts/Context";

import StudieElementImput from "./StudieElementImput";

const StudiesForm = ({ form }) => {
  const { lastEvolution } = useContext(UserContext);
  const values = {
    remember: true,
  };

  useEffect(() => {
    console.log(lastEvolution);
  }, []);

  const initialValues = () => {
    if (lastEvolution != null) {
      if (lastEvolution.chestXRay != null)
        values.chestXRay = lastEvolution.chestXRay;

      if (lastEvolution.chestXRayPathological != null)
        values.chestXRayPathological = lastEvolution.chestXRayPathological;

      if (lastEvolution.chestXRayDescription != null)
        values.chestXRayDescription = lastEvolution.chestXRayDescription;

      if (lastEvolution.chestCt != null) values.chestCt = lastEvolution.chestCt;

      if (lastEvolution.chestCtPathological != null)
        values.chestCtPathological = lastEvolution.chestCtPathological;

      if (lastEvolution.chestCtDescription != null)
        values.chestCtDescription = lastEvolution.chestCtDescription;

      if (lastEvolution.electrocardiogram != null)
        values.electrocardiogram = lastEvolution.electrocardiogram;

      if (lastEvolution.electrocardiogramPathological != null)
        values.electrocardiogramPathological =
          lastEvolution.electrocardiogramPathological;

      if (lastEvolution.electrocardiogramDescription != null)
        values.electrocardiogramDescription =
          lastEvolution.electrocardiogramDescription;

      if (lastEvolution.cReactiveProteinCovid != null)
        values.cReactiveProteinCovid = lastEvolution.cReactiveProteinCovid;

      if (lastEvolution.cReactiveProteinCovidPathological != null)
        values.cReactiveProteinCovidPathological =
          lastEvolution.cReactiveProteinCovidPathological;

      if (lastEvolution.creactiveProteinCovidDescription != null)
        values.creactiveProteinCovidDescription =
          lastEvolution.creactiveProteinCovidDescription;
    }
    console.log("vaaaaalueeessss", values);
    return values;
  };
  return (
    <>
      {lastEvolution != false && (
        <Form
          form={form}
          layout="vertical"
          style={{ width: "100%" }}
          name="studiesForm"
          initialValues={lastEvolution ? initialValues() : { values }}
        >
          <StudieElementImput label="Rx Tx" name="chestXRay" />
          <StudieElementImput label="TAC de Torax" name="chestCt" />
          <StudieElementImput label="ECG" name="electrocardiogram" />
          <StudieElementImput label="PCR Covid" name="cReactiveProteinCovid" />
        </Form>
      )}
    </>
  );
};

export default StudiesForm;
