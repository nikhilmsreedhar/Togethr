import React, { useEffect, useContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { AuthContext, AuthProvider } from "./AuthProvider";
import WelcomeScreen from "../screens/WelcomeScreen";
import LoginScreen from "../screens/Login";
import RegisterScreen from "../screens/Register";
import RegisterScreen2 from "../screens/Register2";
import AddEvent from "../screens/AddEvent";
import Loading from "./Loading";
import BottomNavigator from "./BottomNavigator";

const Stack = createStackNavigator();

const AppRouter = () => {
  const { userData, updateUserData } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  //if data exists in storage it will set state of user in AuthContext
  useEffect(() => {
    AsyncStorage.getItem("user_data")
      .then((data) => {
        if (data) {
          const dataObj = JSON.parse(data);
          console.log(data);
          updateUserData(dataObj);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (loading) {
    return <Loading />;
  }
  
  return (
    <NavigationContainer>
      {userData ? (
        <Stack.Navigator initialRouteName="Main" headerMode="none">
          <Stack.Screen name="Main" component={BottomNavigator}/>
          <Stack.Screen name="AddEvent" component={AddEvent} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator initialRouteName="HomePage" headerMode="none">
          <Stack.Screen name="HomePage" component={WelcomeScreen} />
          <Stack.Screen name="LoginPage" component={LoginScreen} />
          <Stack.Screen name="RegisterPage" component={RegisterScreen} />
          <Stack.Screen name="RegisterPage2" component={RegisterScreen} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default AppRouter;
