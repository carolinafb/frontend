import React, { useState, useContext } from "react";
import { Drawer, Button, List } from "antd";
import TopDrawer from "./TopDrawer";
import { BellFilled, LogoutOutlined, MenuOutlined } from "@ant-design/icons";
import axiosInstance from "../axios";
import { UserContext } from "../../contexts/UserContext";
import { useRouter } from "next/router";
import Link from "next/link";

const Navbar = ({ info }) => {
  const router = useRouter();
  let buttonsToShow = [];
  const [visible, setVisible] = useState(false);
  const { jwt, setJwt, apiEndPoint } = useContext(UserContext);
  const routes = {
    ALERTAS: "",
    "INGRESAR PACIENTE": "/patient/search",
    "PACIENTES NUEVOS": "",
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
      .get(apiEndPoint + "/logOut", { jwt })
      .then((res) => {
        setJwt({});
        router.push(res.data.redirect);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };

  //loads user actions depending on role into array
  if ((info && info.role == "DOCTOR") || info.role == "JEFE DE SISTEMA") {
    buttonsToShow.push("ALERTAS");
    if (info && info.systemName == "GUARDIA") {
      buttonsToShow.push("INGRESAR PACIENTE");
    }
  }
  if (info && info.role == "JEFE DE SISTEMA") {
    buttonsToShow.push("PACIENTES NUEVOS");
  }
  if (info && info.role == "ADMIN") {
    buttonsToShow.push("SISTEMAS");
    buttonsToShow.push("JEFES/MEDICOS");
    buttonsToShow.push("EVALUACIONES");
  }

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
          <Button type="text" onClick={logOut} icon={<LogoutOutlined />}>
            Cerrar Sesion
          </Button>
        }
      >
        <List
          size="medium"
          dataSource={buttonsToShow}
          renderItem={(item) => (
            <List.Item>
              <Link href={routes[item]}>
                <a>{item}</a>
              </Link>
            </List.Item>
          )}
        />
      </Drawer>

      {info ? (
        <label className="title2">
          <strong> {info.name} </strong>/ {info.role}
        </label>
      ) : null}

      <BellFilled />
    </div>
  );
};
export default Navbar;
