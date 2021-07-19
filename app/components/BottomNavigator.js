import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import Explore from '../pages/Explore'
import Events from '../pages/Events'
import Likes from '../pages/Likes'
import AddEvent from '../pages/AddEvent'
import Profile from '../pages/Profile'
const Tab = createBottomTabNavigator();

function BottomNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Explore"
      tabBarOptions={{
        showLabel: false,
        activeTintColor: '#5b06d5',
      }}
    >
      <Tab.Screen
        name="Events"
        component={Events}
        options={{
          tabBarLabel: 'Events',
          showLabel: 'false',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="calendar-multiple" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Likes"
        component={Likes}
        options={{
          tabBarLabel: 'Likes',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="cards-heart" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="AddEvent"
        component={AddEvent}
        options={{
          tabBarVisible: false,
          tabBarLabel: 'AddEvent',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="plus-circle" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Explore"
        component={Explore}
        options={{
          tabBarLabel: 'Explore',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="binoculars" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default BottomNavigator;