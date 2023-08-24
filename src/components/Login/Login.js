import React, { useEffect, useReducer, useState } from "react";

import Card from "../UI/Card/Card";
import Button from "../UI/Button/Button";
import styles from "./Login.module.css";

function reducer(state, action){
  switch(action.type){
    case "UPDATE_EMAIL":
        return {
          ...state,
          email: action.payload, 
          emailIsValid: action.payload.includes("@")
        };
    case "INPUT_BLUR":
      return {
        value: state.value, 
        isValid: state.value.includes("@")};
    case "UPDATE_PASSWORD":
        return {value: action.payload, isValid: action.payload.trim().length > 6};
    case "INPUT_PASSWORD_BLUR":
      return {value: state.value, isValid: state.value.trim().length > 6};
    default:
      return {value:"", isValid: false};
  }
}

function Login(props) {
  // const [password, setPassword] = useState("");
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [state, dispatch] = useReducer(reducer, {
    email:"", 
    emailIsValid: null,
    password:"", 
    passwordIsValid: null,
  }); // primer arg: estado inicial (como funcion), 

  const {isValid} = state

  useEffect(() => {
    const timer = setTimeout(() => {
      //setFormIsValid(isValid && password.trim().length > 6);
      setFormIsValid(isValid);
    }, 500);
    
    return () => {
      clearTimeout(timer);
      // ultima accion en ejecutarse.
    }

  }, [emailIsValid, passwordIsValid]); // useeffect entra en accion cuando alguno de los estados (email, password) notificna cambio

  const emailChangeHandler = (event) => {    
    dispatch({type:"UPDATE_EMAIL", payload: event.target.value}); // type: nombrar mi evento (por convencion en Mayusculas), payload: que va a pasar?
  };

  const passwordChangeHandler = (event) => {
    dispatch({type:"UPDATE_PASSWORD", payload: event.target.value}); // type: nombrar mi evento (por convencion en Mayusculas), payload: que va a pasar?
  };

  const validateEmailHandler = () => {
    dispatch({type:"INPUT_BLUR"}); // type: nombrar mi evento (por convencion en Mayusculas)
  };

  const validatePasswordHandler = () => {
    dispatch({type:"INPUT_PASSWORD_BLUR"}); // type: nombrar mi evento (por convencion en Mayusculas)
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(state.value);
  };

  

  return (
    <Card className={styles.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${styles.control} ${
            state.isValid === false ? styles.invalid : ""
          }`}
        >
          <label htmlFor="email">Correo</label>
          <input
            type="email"
            id="email"
            value={state.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${styles.control} ${
            state.isValid === false ? styles.invalid : ""
          }`}
        >
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            value={state.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={styles.actions}>
          <Button type="submit" disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
}

export default Login;