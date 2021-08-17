import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import Profile from "../screens/Profile";
import TagScreen from "../screens/TagScreen";
import ChangePassword from "../screens/ChangePassword";

const Stack = createStackNavigator();

const ProfileStack = () => {
  return (
    <Stack.Navigator initialRouteName="Profile" headerMode="none">
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Interests" component={TagScreen} />
      <Stack.Screen name="Change Password" component={ChangePassword} />
    </Stack.Navigator>
  );
};

export default ProfileStack;
