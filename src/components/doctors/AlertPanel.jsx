import React from "react";
import { Alert } from "antd";

const onClose = (e) => {
  console.log(e, "I was closed.");
};

const AlertPanel = ({ alerts }) => {
  console.log("alerts", alerts);
  return (
    <>
      {alerts.map((alert) => (
        <Alert
          message={alert.message}
          type="warning"
          closable
          onClose={onClose}
        />
      ))}
    </>
  );
};

export default AlertPanel;
