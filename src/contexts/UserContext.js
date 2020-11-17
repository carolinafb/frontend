import React, { createContext, useState } from "react";
export const UserContext = createContext();

const UserProvider = (props) => {
  const [jwt, setJwt] = useState(null);
  const [dniPatient, setDniPatient] = useState(null);
  const apiEndPoint = "http://localhost:9000";
  const [patientData, setPatientData] = useState({});

  return (
    <UserContext.Provider
      value={{
        jwt,
        setJwt,
        apiEndPoint,
        dniPatient,
        setDniPatient,
        patientData,
        setPatientData,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserProvider;
