import React, { createContext, useEffect, useState } from "react";
const UserContext = createContext();

const UserProvider = (props) => {
  let IS_SERVER = true;
  const HAS_STORAGE = !IS_SERVER && window.sessionStorage;
  let defaultUser = null;

  if (HAS_STORAGE) {
    defaultUser = JSON.parse(sessionStorage.getItem("user"));
  }
  const [DBUser, _setDBUser] = useState(defaultUser);
  const setDBUser = (data) => {
    if (HAS_STORAGE) {
      sessionStorage.setItem("user", JSON.stringify(data));
    }
    _setDBUser(data);
  };

  useEffect(() => {
    IS_SERVER = typeof window === "undefined";
  }, []);

  const [dniPatient, setDniPatient] = useState(null);

  return (
    <UserContext.Provider
      value={{
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

export { UserContext, UserProvider };
