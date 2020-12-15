import React from "react";
import { Alert } from "antd";

const onClose = (alertID) => {
  axiosInstance.put("/alert-seen", {
    id: alertID,
  });
  console.log("marcar como vista Alert ID => ", alertID);
  console.log("I was closed.");
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
          onClose={() => onClose(alert.id)}
        />
      ))}
    </>
  );
};

export default AlertPanel;
