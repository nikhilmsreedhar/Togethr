import React from "react";

import { AuthProvider } from "./components/AuthProvider";
import AppRouter from "./components/AppRouter";
import Loading from "./components/Loading";

import {
  useFonts,
  Comfortaa_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
} from "@expo-google-fonts/dev";


const App = () => {
  let [fontsLoaded] = useFonts({
    Comfortaa_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
  });

  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
};

export default App;
