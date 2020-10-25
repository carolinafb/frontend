import React, { Fragment, useState } from "react";
import { Drawer, Button } from "antd";
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
    <div className="nav-color">
      <Button type="primary" onClick={showDrawer}>
        Menu
      </Button>
      <Drawer
        title="Basic Drawer"
        placement="left"
        closable={true}
        onClose={onClose}
        visible={visible}
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
