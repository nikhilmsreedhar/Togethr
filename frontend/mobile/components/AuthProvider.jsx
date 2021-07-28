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
        login: (user, pass) => {
          axios
            .post("https://togethrgroup1.herokuapp.com/api/login", {
              UserName: user,
              Password: pass,
            })
            .then(
              async (response) => {
                console.log(response);
                setUserData(response.data);
                await AsyncStorage.setItem(
                  "user_data",
                  JSON.stringify(response.data)
                );
              },
              (error) => {
                console.log(error);
              }
            );
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
