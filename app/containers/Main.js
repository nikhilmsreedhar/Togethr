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
      initialRouteName="Profile"
    >
      <Tab.Screen
        name="Explore"
        component={ExploreScreen}
        options={{
          tabBarLabel: 'Explore',
        }}
      />
      <Tab.Screen 
        name="My Events"
        component={AttendingScreen}
      />
      <Tab.Screen
        name="Liked"
        component={SavedEventsScreen}
      />
      <Tab.Screen 
        name="Profile"
        component={ProfileScreen}
      />
      <Tab.Screen
        name="Interests"
        component={InterestsScreen}
      />
    </Tab.Navigator>
  );
}

export default Main;