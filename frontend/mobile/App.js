import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import  HomePage from './pages/HomePage'
import  LoginPage from './pages/LoginPage'
import  RegisterPage from './pages/RegisterPage'
import  RegisterPage2 from './pages/RegisterPage2'
import  RegisterPage3 from './pages/RegisterPage3'
import  AddEvent from './pages/AddEvent'
import LoggedIn from './pages/LoggedIn'
const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomePage" headerMode="none">
        <Stack.Screen name="HomePage" component={HomePage} />
        <Stack.Screen name="LoginPage" component={LoginPage} />
        <Stack.Screen name="RegisterPage" component={RegisterPage} />
        <Stack.Screen name="RegisterPage2" component={RegisterPage2} />
        <Stack.Screen name="RegisterPage3" component={RegisterPage3} />
        <Stack.Screen name="AddEvent" component={AddEvent} />
        <Stack.Screen name="LoggedIn" component={LoggedIn} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;