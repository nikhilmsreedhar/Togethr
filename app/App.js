import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//Screens
import  WelcomeScreen from './screens/WelcomeScreen'
import  LoginScreen from './screens/LoginScreen'
import  RegisterScreen from './screens/RegisterScreen'
import  RegisterScreen2 from './screens/RegisterScreen2'

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="WelcomeScreen" headerMode="none">
        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        <Stack.Screen name="RegisterScreen2" component={RegisterScreen2} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;