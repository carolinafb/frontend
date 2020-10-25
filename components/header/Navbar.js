import React, { useState } from "react";
import { Drawer, Button } from "antd";
import  TopDrawer  from "./TopDrawer";
import { BellFilled } from "@ant-design/icons";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };

  return (
    <div>
      <Button type="primary" onClick={showDrawer}>
        Menu
      </Button>
      <Drawer
        title={<TopDrawer />}
        placement="left"
        closable={true}
        onClose={onClose}
        visible={visible}
        headerStyle={{ backgroundColor: "rgb(107, 45, 177)" }}
        footer={<label>logout</label>}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
      <label className="title2">Nombre/Rol</label>
      <BellFilled />
    </div>
  );
};
export default Navbar;
