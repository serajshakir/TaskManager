// src/app/configurations/useAuth.jsx
import { createContext, useContext, useState } from "react";
import { clearAuth, getAuth, storeAuth } from "./authStorage";

const AuthContext = createContext();

// This hook is what Home.jsx calls
const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
    const initiAuth = getAuth();
    const iniiData = {
        isLogin: false,
        token: "",
        userName: ""
    };
    const [auth, setAuth] = useState(initiAuth ? initiAuth : iniiData);

    const logedIn = (data) => {
        setAuth(data);
        storeAuth(data);
    };

    const logedOut = () => {
        setAuth(iniiData);
        clearAuth();
    };

    return (
        <AuthContext.Provider value={{ logedIn, logedOut, auth }}>
            {children}
        </AuthContext.Provider>
    );
};

export default useAuth;
export { AuthProvider };