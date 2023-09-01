// import React, { useEffect, useState } from "react";
// import Login from "./components/Login/Login";
// import Home from "./components/Home/Home";
// import Header from "./components/Header/Header";
// import AuthContext from "./context/AuthContext";

// function App() {
  
//   return (
//     <AuthContext.Provider value={{isLoggedIn}}>
//       <Header />
//       <main>
//         {!isLoggedIn && <Login/>}
//         {isLoggedIn && <Home />}
//       </main>
//     </AuthContext.Provider>

//     // <AuthContext.Provider value={{isLoggedIn}}>
//     //   <Header isAuthenticated={isLoggedIn} onLogout={logoutHandler} />
//     //   <main>
//     //     {!isLoggedIn && <Login onLogin={loginHandler} />}
//     //     {isLoggedIn && <Home onLogout={logoutHandler} />}
//     //   </main>
//     // </AuthContext.Provider>

//     // <React.Fragment>
//     //   <Header isAuthenticated={isLoggedIn} onLogout={logoutHandler} />
//     //   <main>
//     //     {!isLoggedIn && <Login onLogin={loginHandler} />}
//     //     {isLoggedIn && <Home onLogout={logoutHandler} />}
//     //   </main>
//     // </React.Fragment>
//   );
// }

// export default App;

import React from "react";
import { Routes, Route } from "react-router-dom";
import RequireAuth from "./components/RequireAuth/RequireAuth";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import Header from "./components/Header/Header";
import Public from "./components/Public/Public";
import Gallery from "./components/Gallery/Gallery";

function App() {
  return (
    <React.Fragment>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Public />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/home/:userId"
            element={
              <RequireAuth>
                <Home />
              </RequireAuth>
            }
          />          
          <Route path="/gallery/*" element={<Gallery />} />
        </Routes>
      </main>
    </React.Fragment>
  );
}

export default App;
