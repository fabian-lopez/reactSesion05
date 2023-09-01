import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";


const BASE_URL = "https://react-http-ea33a-default-rtdb.firebaseio.com/";


const AuthContext = React.createContext({
  isLoggedIn: false,
  onLogout: () => { },
  onLogin: () => { },
});

export function AuthContextProvider(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isLoggedIn");

    if (isAuthenticated === "1") {
      setIsLoggedIn(true);
    }
  }, []);

  const fetchUser = async (email) => {
    const url = `${BASE_URL}users.json?orderBy="email"&equalTo="${email}"`;
    const response = await fetch(url);
    
    if(!response.ok) throw new Error("Algo salio mal");
    return response.json();
  };

  const validateUser = (user) => {
    if(user === undefined) throw new Error("Usuario o password incorrecto.");
    if(JSON.stringify(user) === '{}') throw new Error("Usuario o password incorrecto.");
    
  }

  const [searchParams, setSearchParams] = useSearchParams();

  const loginHandler = async (email, callback) => {
    try {
        const user = await fetchUser(email);
        
        validateUser(user);

        setSearchParams({usrID: Object.keys(user)[0]});
        localStorage.setItem("uuid", Object.keys(user)[0]);
        localStorage.setItem("isLoggedIn", "1");
        setIsLoggedIn(true);

        return callback();
    } catch (error) {
        console.log(`Error: ${error.message}`);
    }
  };


  const logoutHandler = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("uuid");
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        onLogout: logoutHandler,
        onLogin: loginHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;