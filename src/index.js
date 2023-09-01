import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import App from "./App";
import "./index.css";

ReactDOM.render(
  <BrowserRouter>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </BrowserRouter>,
  document.getElementById("root")
);


/*

https://firebase.google.com/docs/database/rest/retrieve-data?authuser=0#section-rest-filtering

*/