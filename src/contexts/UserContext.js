import React, { createContext, useState } from "react";

export const UserContext = createContext();

//provider
const UserProvider = (props) => {
  let defaultJWT = null;
  let defaultUser = null;
  if (sessionStorage) {
    defaultJWT = JSON.parse(sessionStorage.getItem('jwt'));
    defaultUser = JSON.parse(sessionStorage.getItem('user'));
  };
  const [jwt, _setJwt] = useState(defaultJWT);
  const setJwt = (data) => {
    if (sessionStorage) {
      sessionStorage.setItem('jwt', JSON.stringify(data));
    };
    _setJwt(data);
  };
  const [DBUser, _setDBUser] = useState(defaultUser);
  const setDBUser = (data) => {
    if (sessionStorage) {
      sessionStorage.setItem('user', JSON.stringify(data));
    };
    _setDBUser(data);
  };
  const apiEndPoint = "https://localhost:9000";

  return (
    <UserContext.Provider value={{ jwt, setJwt, apiEndPoint, setDBUser, DBUser }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserProvider;
