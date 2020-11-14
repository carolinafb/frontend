import React, { createContext, useState } from "react";
export const UserContext = createContext();

const UserProvider = (props) => {
  const [jwt, setJwt] = useState(null);
  const [dniPatient, setDniPatient] = useState(null);
  const apiEndPoint = "http://localhost:9000";

  return (
    <UserContext.Provider
      value={{ jwt, setJwt, apiEndPoint, dniPatient, setDniPatient }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserProvider;
