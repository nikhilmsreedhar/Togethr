import React from "react";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import ExploreScreen from "../screens/Explore";
import AttendingScreen from "../screens/AttendingEvents";
import SavedEventsScreen from "../screens/SavedEvents";
import ProfileScreen from "../screens/Profile";
import InterestsScreen from "../screens/Interests";

const Tab = createMaterialBottomTabNavigator();

const Main = () => {
  return(
    <Tab.Navigator
      initialRouteName="Explore"
    >
      <Tab.Screen
        name="Explore"
        component={ExploreScreen}
        options={{
          tabBarLabel: 'Explore',
          tabBarIcon: 'calendar-multiple'
        }}
      />
      <Tab.Screen 
        name="My Events"
        component={AttendingScreen}
        options={{
          tabBarLabel: '',
          tabBarIcon: 'binoculars'
        }}
      />
      <Tab.Screen
        name="Liked"
        component={SavedEventsScreen}
        options={{
          tabBarLabel: 'Explore',
          tabBarIcon: 'calendar-multiple'
        }}
      />
      <Tab.Screen 
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Explore',
          tabBarIcon: 'calendar-multiple'
        }}
      />
    </Tab.Navigator>
  );
}

export default Main;