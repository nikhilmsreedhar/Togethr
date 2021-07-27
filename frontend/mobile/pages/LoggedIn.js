import React, { useState } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import BottomNavigator from '../components/BottomNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Stack = createStackNavigator();

function LoggedIn() {
  const [loading, setLoading] = useState(true);

  return (  
    <NavigationContainer independent={true}>
      <BottomNavigator />
      
    </NavigationContainer>
  );
}

export default LoggedIn;