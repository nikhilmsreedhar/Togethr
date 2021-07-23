import React, { useState } from "react";
import { AsyncStorage } from "@react-native-async-storage/async-storage";

export const AuthContext = React.createContext({});

export const AuthProvider = ({children}) => {
  const [userData, setUserData] = useState(null);

  return (
    <AuthContext.Provider
      value={{
        userData,
        login: () => {
          setUserData({});
          AsyncStorage.setItem('userData', JSON.stringify());
        },
        logout: () => {
          setUserData(null);
        }
      }}
      >
        {children}
      </AuthContext.Provider>
  )
}