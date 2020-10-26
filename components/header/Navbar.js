import React, { useState } from "react";
import { Drawer, Button } from "antd";
import TopDrawer from "./TopDrawer";
import { BellFilled, LogoutOutlined, MenuOutlined } from "@ant-design/icons";

const Navbar = ({ user, buttons }) => {
  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };

  //loads user actions depending on role into array

  return (
    <div className="nav-color">
      <Button type="text" onClick={showDrawer} icon={<MenuOutlined />}></Button>
      <Drawer
        title={<TopDrawer userInfo={user} />}
        placement="left"
        closable={true}
        onClose={onClose}
        visible={visible}
        headerStyle={{ backgroundColor: "rgb(107, 45, 177)" }}
        footer={
          <Button type="text" icon={<LogoutOutlined />}>
            Cerrar Sesion
          </Button>
        }
      >
        <p>noleguta</p>
        {buttons.map((element) => {
          return <Button type="text">{element}</Button>;
        })}
        <Button type="text">{buttons[0]}</Button>
      </Drawer>
      <label className="title2">Nombre/Rol</label>
      <BellFilled />
    </div>
  );
};
export default Navbar;
