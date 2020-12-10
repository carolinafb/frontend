import React, { Fragment } from "react";

const ClinicalStudy = ({ type, description }) => {
  return (
    <Fragment>
      <p>
        <strong>Tipo: </strong>
        {type ? type : "No cargado"} <br />
      </p>
      <p>
        <strong>Descripcion: </strong>
        {description ? description : "No cargado"} <br />
      </p>
    </Fragment>
  );
};

export default ClinicalStudy;
