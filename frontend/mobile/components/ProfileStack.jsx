import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import Profile from "../pages/Profile";
import Interests from "../pages/InterestsPage";
import ChangePassword from "./ChangePassword";

const Stack = createStackNavigator();

const ProfileStack = () => {
  return (
    <Stack.Navigator initialRouteName="Profile" headerMode="none">
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Interests" component={Interests} />
      <Stack.Screen name="Change Password" component={ChangePassword} />
    </Stack.Navigator>
  );
};

export default ProfileStack;
