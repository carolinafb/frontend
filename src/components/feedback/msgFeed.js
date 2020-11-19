import React, { Fragment } from "react";
import { Result, Button } from "antd";

const MsgFeed = (type, msg, btnFun, btnMsg) => {
  return (
    <Result
      status={type}
      title={msg}
      extra={[
        <Button type="primary" key="console" onClick={btnFun}>
          {btnMsg}
        </Button>,
      ]}
    />
  );
};

export default MsgFeed;
