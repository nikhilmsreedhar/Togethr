import * as React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { TextInput, HelperText } from "react-native-paper";

const RegisterPage2 = ({ route }) => {
  const firstName = route.params.firstName;
  const lastName = route.params.lastName;

  const navigation = useNavigation();
  function navigateBack() {
    navigation.goBack();
  }

  function goToNextPage(firstName, lastName, user, pass) {
    if (user == "" || pass == "") {
      alert("Please fill in all fields");
    } else {
      navigation.navigate("RegisterPage3", {
        firstName: firstName,
        lastName: lastName,
        username: user,
        password: pass,
      });
    }
  }

  const [user, setUser] = React.useState("");
  const [pass, setPass] = React.useState("");
  const [passConfirm, setPassConfirm] = React.useState("");

  const hasErrors = () => {
    return !(pass == passConfirm);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigateBack()}>
          <Ionicons name="arrow-back" size={30} color="back" />
        </TouchableOpacity>
        <Text style={styles.verticalDivider}></Text>
        <Text h1 style={styles.title}>
          Register
        </Text>
        <Text style={styles.verticalDivider}></Text>

        <TextInput
          style={{ alignSelf: "stretch" }}
          label="Username"
          value={user}
          mode="outlined"
          onChangeText={(user) => setUser(user)}
        />

        <Text style={styles.inputDivider}></Text>

        <TextInput
          style={{ alignSelf: "stretch" }}
          secureTextEntry
          label="Password"
          value={pass}
          mode="outlined"
          onChangeText={(pass) => setPass(pass)}
        />

        <Text style={styles.inputDivider}></Text>

        <TextInput
          style={{ alignSelf: "stretch" }}
          secureTextEntry
          label="Confirm Password"
          value={passConfirm}
          mode="outlined"
          error={pass == passConfirm ? false : true}
          onChangeText={(passConfirm) => setPassConfirm(passConfirm)}
        />

        <HelperText type="error" visible={hasErrors()}>
          Passwords do not match
        </HelperText>

        <Text style={styles.inputDivider}></Text>

        <TouchableOpacity
          disabled={pass == passConfirm ? false : true}
          onPress={() => goToNextPage(firstName, lastName, user, pass)}
          style={styles.regButton}
        >
          <Text style={styles.regButtonText}>REGISTER</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

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
  regButton: {
    backgroundColor: "black",
    borderColor: "black",
    alignSelf: "stretch",
    height: 50,
    borderWidth: 3,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
  regButtonText: {
    fontSize: 18,
    color: "white",
    fontFamily: "Roboto_500Medium",
  },
});

export default RegisterPage2;
