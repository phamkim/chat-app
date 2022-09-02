import { Spin } from "antd";
import React, { createContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom"
import { auth } from "../fireBase/config";

export const AuthContext = createContext();


const AuthProvider = ({ children }) => {
    const [user, setUser] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const history = useHistory();
    useEffect(() => {
        const unsubscibed = auth.onAuthStateChanged((user) => {
            if (user) {
              const { displayName, email, uid, photoURL } = user;
              setUser({
                displayName,
                email,
                uid,
                photoURL,
              });
              setIsLoading(false);
              history.push('/');
              return;
            }
      
            // reset user info
            setUser({});
            setIsLoading(false);
            history.push('/login');
          });
      
          // clean function
          return () => {
            unsubscibed();
          };
    }, [history]);

    return (
        <AuthContext.Provider value={{ user }}>
            {isLoading ? <Spin style={{ position: 'fixed', inset: 0 }} /> : children}
        </AuthContext.Provider>
    );
}


export default AuthProvider;