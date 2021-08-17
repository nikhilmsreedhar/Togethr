import React, { useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = React.createContext({
  userData: null,
  updateUserData: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);

  return (
    <AuthContext.Provider
      value={{
        userData,
        updateUserData: (input) => {
          AsyncStorage.setItem("user_data", JSON.stringify(input));
          setUserData(input);
        },
        logout: () => {
          AsyncStorage.removeItem("user_data");
          AsyncStorage.removeItem("events_data");
          setUserData(null);
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
