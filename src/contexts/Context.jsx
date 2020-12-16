import React, { createContext, useEffect, useState } from "react";
const UserContext = createContext();

const UserProvider = (props) => {
  console.log("se llamos al use provider");
  let IS_SERVER = typeof window === "undefined";
  const HAS_STORAGE = !IS_SERVER && window.sessionStorage;
  let defaultUser = null;
  let defaultOnline = true;

  if (HAS_STORAGE) {
    defaultUser = JSON.parse(sessionStorage.getItem("user"));
    const isOnLine = sessionStorage.getItem("online") ? true : false;
    if (isOnLine) defaultOnline = sessionStorage.getItem("online") == "true";
    else {
      sessionStorage.setItem("online", defaultOnline);
    }
    console.log("se ejecuta el user provider", defaultUser);
  }

  const [DBUser, _setDBUser] = useState(defaultUser);
  const [online, _setOnline] = useState(defaultOnline);

  const setOnline = (data) => {
    if (HAS_STORAGE) {
      console.log("set online con valor ", data);
      sessionStorage.setItem("online", data);
    }
    _setOnline(data);
  };

  const setDBUser = (data) => {
    console.log("se llama al setDBUSER");
    if (HAS_STORAGE) {
      console.log("entro en el setDBUser con HAS Storage");
      sessionStorage.setItem("user", JSON.stringify(data));
    }
    _setDBUser(data);
  };

  useEffect(() => {
    IS_SERVER = typeof window === "undefined";
  }, []);

  const [dniPatient, setDniPatient] = useState(null);
  const [needCreateBeds, setNeedCreateBeds] = useState(null);
  const [idPatient, setIdPatient] = useState(null);
  const [lastEvolution, setLastEvolution] = React.useState(false);

  return (
    <UserContext.Provider
      value={{
        dniPatient,
        setDniPatient,
        setDBUser,
        DBUser,
        needCreateBeds,
        setNeedCreateBeds,
        idPatient,
        setIdPatient,
        lastEvolution,
        setLastEvolution,
        online,
        setOnline,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
