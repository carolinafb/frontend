import React, { createContext, useState } from "react";

export const UserContext = createContext();


//provider
const UserProvider = (props) => {
  const IS_SERVER = typeof window === "undefined";
  const HAS_STORAGE = (!IS_SERVER && window.sessionStorage);
  let defaultUser = null;
  if (HAS_STORAGE) {
    defaultUser = JSON.parse(sessionStorage.getItem('user'));
  };
  const [DBUser, _setDBUser] = useState(defaultUser);
  const setDBUser = (data) => {
    if (HAS_STORAGE) {
      sessionStorage.setItem('user', JSON.stringify(data));
    };
    _setDBUser(data);
  };

  return (
    <UserContext.Provider value={{ setDBUser, DBUser }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserProvider;
