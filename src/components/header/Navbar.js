import { Drawer, Button, List } from "antd";
import React, { useState, useContext, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import AlertPanel from "src/components/doctors/AlertPanel";
import { UserContext } from "../../contexts/Context";
import axiosInstance from "../axios";
import TopDrawer from "./TopDrawer";
import { BellFilled, LogoutOutlined, MenuOutlined } from "@ant-design/icons";

const Navbar = () => {
  const router = useRouter();
  let buttonsToShow = [];
  const [visible, setVisible] = useState(false);
  var { DBUser: user } = useContext(UserContext);

  const routes = {
    ALERTAS: "",
    "INGRESAR PACIENTE": "/patient/search",
    "PACIENTES NUEVOS": "/patients/newInTheSystem",
    SISTEMAS: "",
    "JEFES/MEDICOS": "",
    EVALUACIONES: "",
  };

  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };
  const logOut = () => {
    // Make a request for a user with a given ID
    axiosInstance
      .get("/logOut")
      .then(res => {
        router.push(res.data.redirect);
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      });
  };

  //loads user actions depending on role into array
  if (user != null) {
    if ((user && user.role == "DOCTOR") || user.role == "JEFE DE SISTEMA") {
      buttonsToShow.push("ALERTAS");
      if (user && user.systemName == "GUARDIA") {
        buttonsToShow.push("INGRESAR PACIENTE");
      }
    }
    if (user && user.role == "JEFE DE SISTEMA") {
      buttonsToShow.push("PACIENTES NUEVOS");
    }
    if (user && user.role == "ADMIN") {
      buttonsToShow.push("SISTEMAS");
      buttonsToShow.push("JEFES/MEDICOS");
      buttonsToShow.push("EVALUACIONES");
    }
  }

  const [alerts, setAlerts] = useState();
  const [alertsVisibility, setAlertsVisibility] = useState(false);

  useEffect(
    () =>
      axiosInstance.get("/alerts").then(response => setAlerts(response.data)),
    []
  );
  return (
    <div className="nav-color">
      <Button type="text" onClick={showDrawer} icon={<MenuOutlined />} />
      <Drawer
        title={<TopDrawer userInfo={user} />}
        placement="left"
        closable={true}
        onClose={onClose}
        visible={visible}
        headerStyle={{ backgroundColor: "rgb(107, 45, 177)" }}
        footer={
          <Button type="text" onClick={logOut} icon={<LogoutOutlined />}>
            Cerrar Sesion
          </Button>
        }
      >
        <List
          size="medium"
          dataSource={buttonsToShow}
          renderItem={item => (
            <List.Item>
              <Link href={routes[item]}>
                <a>{item}</a>
              </Link>
            </List.Item>
          )}
        />
      </Drawer>

      {user ? (
        <label className="title2">
          <strong> {user.name} </strong>/ {user.role}
        </label>
      ) : null}

      <BellFilled onClick={() => setAlertsVisibility(!alertsVisibility)} />
      {alertsVisibility && <AlertPanel alerts={alerts} />}
    </div>
  );
};
export default Navbar;
