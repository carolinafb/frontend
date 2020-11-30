import React, { Fragment } from "react";

const ClinicalStudy = ({ type, description }) => {
  return (
    <Fragment>
      <label>
        <strong>Tipo: </strong>
      </label>
      {type ? type : "No cargado"} <br />
      <label>
        <strong>Descripcion: </strong>
      </label>
      {description ? description : "No cargado"} <br />
    </Fragment>
  );
};

export default ClinicalStudy;
