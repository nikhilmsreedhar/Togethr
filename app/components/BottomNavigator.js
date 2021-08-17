import React, {useState} from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import ExploreScreen from "../screens/Explore";
import AttendingScreen from "../screens/AttendingEvents";
import SavedEventsScreen from "../screens/SavedEvents";
import ProfileStack from "../components/ProfileStack";
import AddEvent from "../screens/AddEvent";

const Tab = createBottomTabNavigator();

function BottomNavigator() {

  const [isLoading, setIsLoading] = useState(false);

  return (
    <Tab.Navigator
      initialRouteName="Explore"
      backBehavior="history"
      tabBarOptions={{
        showLabel: false,
        activeTintColor: "#5b06d5",
      }}
    >
      <Tab.Screen
        name="Explore"
        component={ExploreScreen}
        options={{
          unmountOnBlur: true,
          tabBarLabel: "Explore",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="binoculars"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Events"
        component={Events}
        options={{
          unmountOnBlur: true,
          tabBarLabel: "Events",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="calendar-multiple"
              color={color}
              size={size}
            />
          ),
        }}
      />
      {/* <Tab.Screen
        name="AddEvent"
        component={AddEvent}
        options={{
          tabBarVisible: false,
          tabBarLabel: "AddEvent",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="plus-circle"
              color={color}
              size={size}
            />
          ),
        }}
      /> */}
      <Tab.Screen
        name="Likes"
        component={SavedEventsScreen}
        options={{
          tabBarLabel: "Likes",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="cards-heart"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="ProfileStack"
        component={ProfileStack}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default BottomNavigator;
