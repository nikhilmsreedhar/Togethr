import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import  HomePage from './components/HomePage'
import  LoginPage from './components/LoginPage'
import  RegisterPage from './components/RegisterPage'
import  RegisterPage2 from './components/RegisterPage2'
import  RegisterPage3 from './components/RegisterPage3'

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
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;