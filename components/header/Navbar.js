import React, { useEffect,useState } from "react";
import { Drawer, Button ,List} from "antd";
import TopDrawer from "./TopDrawer";
import { BellFilled, LogoutOutlined, MenuOutlined } from "@ant-design/icons";

const Navbar = ({ info }) => {

  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };


  let buttonsToShow = [];
  useEffect(() => {
    if (info && info.role == ("DOCTOR" || "SYSTEMCHIEF")) {
      buttonsToShow.push("ALERTAS");
      if (info && info.system == "GUARDIA") {
        buttonsToShow.push("INGRESAR PACIENTE");
      }
    }
    if (info && info.role == "SYSTEMCHIEF") {
      buttonsToShow.push("PACIENTES NUEVOS");
    }
    if (info && info.role == "ADMIN") {
      buttonsToShow.push("SISTEMAS");
      buttonsToShow.push("JEFES/MEDICOS");
      buttonsToShow.push("EVALUACIONES");
    }
  });

  //loads user actions depending on role into array

  return (
    
    <div className="nav-color">
      <Button type="text" onClick={showDrawer} icon={<MenuOutlined />}></Button>
      <Drawer
        title={<TopDrawer userInfo={info} />}
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
    <List
      size="medium"
      dataSource={buttonsToShow}
      renderItem={item => <List.Item> <Button type="text">{item}</Button></List.Item>}
    />

      
      </Drawer>
      <label className="title2">Nombre/Rol</label>
      <BellFilled />
    </div>
  );
};
export default Navbar;
