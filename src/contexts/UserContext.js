import React, { createContext, useState } from "react";
export const UserContext = createContext();

const UserProvider = (props) => {
  const IS_SERVER = typeof window === "undefined";
  const HAS_STORAGE = !IS_SERVER && window.sessionStorage;
  let defaultJWT = null;
  let defaultUser = null;

  if (HAS_STORAGE) {
    defaultJWT = JSON.parse(sessionStorage.getItem("jwt"));
    defaultUser = JSON.parse(sessionStorage.getItem("user"));
  }
  const [jwt, _setJwt] = useState(defaultJWT);
  const setJwt = (data) => {
    if (HAS_STORAGE) {
      sessionStorage.setItem("jwt", JSON.stringify(data));
    }
    _setJwt(data);
  };
  const [DBUser, _setDBUser] = useState(defaultUser);
  const setDBUser = (data) => {
    if (HAS_STORAGE) {
      sessionStorage.setItem("user", JSON.stringify(data));
    }
    _setDBUser(data);
  };

  const apiEndPoint = "https://localhost:9000";
  const [dniPatient, setDniPatient] = useState(null);
  return (
    <UserContext.Provider
      value={{
        jwt,
        setJwt,
        apiEndPoint,
        dniPatient,
        setDniPatient,
        setDBUser,
        DBUser,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserProvider;
