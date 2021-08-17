import React from "react";
import { StyleSheet, View, TouchableOpacity, Button } from "react-native";
import { Text, Title } from "react-native-paper";
import {
  useFonts,
  Comfortaa_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
} from "@expo-google-fonts/dev";
import { useNavigation } from "@react-navigation/native";

const Welcome = () => {
  let [fontsLoaded] = useFonts({
    Comfortaa_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
  });

  const navigation = useNavigation();
  function navigateToLogin() {
    navigation.navigate("LoginPage");
  }
  function navigateToRegister() {
    navigation.navigate("RegisterPage");
  }

  return (
    <View style={styles.container}>
      <View style={{ alignItems: "center", borderWidth: 1 }}>
        <Title
          style={{
            fontSize: 80,
            fontFamily: "Comfortaa_400Regular",
            marginBottom: 100,
            borderWidth: 1,
          }}
        >
          Togethr
        </Title>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "",
            borderWidth: 1,
            width: '100%'
          }}
        >
          {/* <View style={{ display: "flex", flexDirection: "row" }}> */}
            <Button
              mode="outlined"
              contentStyle={styles.loginButton}
              onPress={() => navigateToLogin()}
            >
              LOG IN
            </Button>
          {/* </View> */}

          {/* <View style={{ display: "flex", flexDirection: "row" }}> */}
            <Button
              mode="contained"
              style={styles.registerButton}
              contentStyle={styles.registerButton}
              onPress={() => navigateToRegister()}
            >
              <Text>REGISTER</Text>
            </Button>
          {/* </View> */}
          E
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {},
  loginButton: {
    marginRight: 5,
    backgroundColor: "white",
    borderColor: "black",
    width: 150,
    height: 50,
  },
  loginButtonText: {
    fontSize: 18,
    color: "black",
    fontFamily: "Roboto_500Medium",
  },
  registerButton: {
    marginLeft: 5,
    backgroundColor: "black",
    borderColor: "black",
    width: 150,
    height: 50,
  },
  registerButtonText: {
    fontSize: 18,
    color: "white",
    fontFamily: "Roboto_500Medium",
  },
  buttonDivider: {
    width: 10,
  },
  verticalDivider: {
    height: 50,
  },
});

export default Welcome;
