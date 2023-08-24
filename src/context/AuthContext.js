import React from  "react";

// context --- contexto --- alcance
const AuthContext = React.createContext({
    isLoggedIn: false,
    onLogin: () => {},
    onLogout: () => {}
});


export function AuthContextProvider(props){
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const isAuthenticated = localStorage.getItem("isLoggedIn");
        if(isAuthenticated === "1")
        setIsLoggedIn(true);
    }, []) // necesita pasar una funcion e indicarle sobre quien trabajara

    const loginHandler = (email, password) => {
        localStorage.setItem("isLoggedIn", "1");
        setIsLoggedIn(true);
    };
    
    const logoutHandler = () => {
        localStorage.removeItem("isLoggedIn");
        setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider
            value ={{
                isLoggedIn: isLoggedIn,
                onLogout: logoutHandler,
                onLogin: loginHandler
            }}
        >
            {props.Children}
        </AuthContext.Provider>
    );
}

export default AuthContext;