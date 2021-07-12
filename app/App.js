import React from 'react';

import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//Screens
import  WelcomeScreen from './screens/WelcomeScreen'
import  LoginScreen from './screens/LoginScreen'
import  RegisterScreen from './screens/RegisterScreen'
import  RegisterScreen2 from './screens/RegisterScreen2'
import Main from './containers/Main'

const Stack = createStackNavigator();

function App() {
  return (
    //PaperProvider handles theming from React Native Paper
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="WelcomeScreen" headerMode="none">
          <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
          <Stack.Screen name="RegisterScreen2" component={RegisterScreen2} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

export default App;