import React, { useState } from "react";
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = React.createContext({
  userData: null,
  login: () => {},
  logout: () => {}
});

export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);

  return (
    <AuthContext.Provider
      value={{
        userData,
        login: (input) => {
          setUserData(input);
          AsyncStorage.setItem('user_data', JSON.stringify(input));
        },
        logout: () => {
          setUserData(null);
          AsyncStorage.removeItem('user_data');
          AsyncStorage.removeItem('events_data');
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
