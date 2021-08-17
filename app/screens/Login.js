import React, {useState, useContext} from "react";
import axios from "axios";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { TextInput, HelperText, IconButton } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../components/AuthProvider";

export default function LoginPage() {
  const {updateUserData} = useContext(AuthContext);

  const navigation = useNavigation();
  function navigateBack() {
    navigation.goBack();
  }

  const [user, setUser] = React.useState("");
  const [pass, setPass] = React.useState("");
  const [loginMessage, setLoginMessage] = React.useState("");

  // This is where the logic for the login function will be added
  const submit = (user, pass) => {
    if (user == "" && pass == "") {
      setLoginMessage("Please enter username and password");
    } else if (user == "" && pass != "") {
      setLoginMessage("Please enter username");
    } else if (user != "" && pass == "") {
      setLoginMessage("Please enter password");
    } else {
      axios
        .post("https://togethrgroup1.herokuapp.com/api/login", {
          UserName: user,
          Password: pass,
        })
        .then((response) => {
            console.log(response);
            updateUserData(response.data);
          },
          (error) => {
            setLoginMessage("Incorrect Username or Password");
            console.log(error);
          }
        );
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        
        <IconButton icon='arrow-back' onPress={() => navigateBack()} />

        <Title h1 style={styles.title}>
          Log In
        </Title>
        
        <TextInput
          style={{ alignSelf: "stretch" }}
          label="Username"
          value={user}
          mode="outlined"
          onChangeText={(user) => setUser(user)}
        />

        <TextInput
          style={{ alignSelf: "stretch" }}
          secureTextEntry
          label="Password"
          value={pass}
          mode="outlined"
          onChangeText={(pass) => setPass(pass)}
        />

        <HelperText type="error">{loginMessage}</HelperText>

        <Button
          onPress={() => submit(user, pass)}
          style={styles.loginButton}
        >
          <Text style={styles.loginButtonText}>LOG IN</Text>
        </Button>

        <Button
          mode="text"
          onPress={() => {}}
          style={{alignSelf: 'center', marginTop: 10}}
        >Forgot Password?
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 50,
    fontFamily: "Comfortaa_400Regular",
  },
  input: {
    padding: 20,
  },
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    margin: 25,
  },
  verticalDivider: {
    height: 50,
  },
  inputDivider: {
    height: 20,
  },
  loginButton: {
    backgroundColor: "black",
    borderColor: "black",
    alignSelf: "stretch",
    height: 50,
    borderWidth: 3,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
  loginButtonText: {
    fontSize: 18,
    color: "white",
    fontFamily: "Roboto_500Medium",
  },
});
