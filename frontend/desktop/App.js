import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import  HomePage from './pages/HomePage'
import  LoginPage from './pages/LoginPage'
import  RegisterPage from './pages/RegisterPage'
import  RegisterPage2 from './pages/RegisterPage2'
import  EditTags from './pages/EditTags'
import  AddEvent from './pages/AddEvent'
import Explore from './pages/Explore'
import Events from './pages/Events'
import Likes from './pages/Likes'
import Profile from './pages/Profile'
import EditAccountInfo from './pages/EditAccountInfo'

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomePage" headerMode="none">
        <Stack.Screen name="HomePage" component={HomePage} />
        <Stack.Screen name="LoginPage" component={LoginPage} />
        <Stack.Screen name="RegisterPage" component={RegisterPage} />
        <Stack.Screen name="RegisterPage2" component={RegisterPage2} />
        <Stack.Screen name="EditTags" component={EditTags} />
        <Stack.Screen name="AddEvent" component={AddEvent} />
        <Stack.Screen name="Explore" component={Explore} />
        <Stack.Screen name="Events" component={Events} />
        <Stack.Screen name="Likes" component={Likes} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="EditAccountInfo" component={EditAccountInfo} />
      </Stack.Navigator>
   
    </NavigationContainer>
  );
}

export default App;