import Card from "../UI/Card/Card";
import styles from "./Home.module.css";
import React, { useEffect, useState} from "react";
import useHttp from "../Hooks/use-http"
import { useParams, useSearchParams } from "react-router-dom";


const BASE_URL = "https://react-http-ea33a-default-rtdb.firebaseio.com/";

function Home() {

  const {isLoadingCH, errorCH, request} = useHttp();

  // const [isLoading, setIsLoading] = useState(true);
  // const [error, setError] = useState(null);
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
  });

  const {userId} = useParams();

  useEffect(() => {
    const fetchUser = async () => {

      
      //const userId = localStorage.getItem("uuid");

      const url = `${BASE_URL}/users.json?orderBy="$key"&equalTo="${userId}"`;
      
      const data = await request({ url });
      console.log("aqui truena", userId)
      setUser({
        first_name: data[userId].first_name,
        last_name: data[userId].last_name,
        email: data[userId].email,
      });
  
      // setUser({
      //   first_name: responseData[userId].first_name,
      //   last_name: responseData[userId].last_name,
      //   email: responseData[userId].email,
      // });
    };
  
    fetchUser();
  }, []);

  const loadingMessage = <h2>Cargando...</h2>;

  const errorMessage = <h2>{errorCH}</h2>;
  
  return (
    <Card className={styles.home}>
      {isLoadingCH && loadingMessage}
      {errorCH && errorMessage}
      {!isLoadingCH && !errorCH && (
        <React.Fragment>
          <h1>¡Bienvenido!</h1>
          <h2>
            {user.first_name} {user.last_name}
          </h2>
        </React.Fragment>
      )}
    </Card>
  );
}

export default Home;
