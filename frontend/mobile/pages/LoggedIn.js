import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import BottomNavigator from '../components/BottomNavigator'
const Stack = createStackNavigator();

function LoggedIn() {
  return (
 
    <NavigationContainer independent={true}>
      <BottomNavigator />
    </NavigationContainer>
  );
}

export default LoggedIn;