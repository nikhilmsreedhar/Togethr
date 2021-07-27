import React, { useState } from "react";
import { AsyncStorage } from "@react-native-async-storage/async-storage";

export const AuthContext = React.createContext({});

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
                setUserData(response);
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
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
