import React, { createContext, useState} from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    const login = (obj) => {
        setUser(obj);
        setToken(obj.token);
    };

    const logout = () => {
        setUser(null);
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, token }}>
            {children}            
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider};